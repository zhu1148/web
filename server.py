import http.server
import json
import psutil
import subprocess
import os
import sys
import socket

PORT = 8765

def get_cpu():
    percent = psutil.cpu_percent(interval=0.5)
    cores = psutil.cpu_percent(interval=0.1, percpu=True)
    return {"percent": percent, "cores": cores, "count": psutil.cpu_count()}

def get_memory():
    mem = psutil.virtual_memory()
    return {"total": round(mem.total / (1024**3), 1), "used": round(mem.used / (1024**3), 1), "percent": mem.percent}

def get_gpu():
    # 1. Try NVIDIA
    try:
        out = subprocess.check_output(
            ['nvidia-smi', '--query-gpu=name,utilization.gpu,memory.used,memory.total',
             '--format=csv,noheader,nounits'],
            timeout=5
        ).decode().strip()
        parts = out.split(',')
        if len(parts) >= 4:
            return {
                "name": parts[0].strip(),
                "load": int(parts[1].strip()),
                "mem_used": int(parts[2].strip()),
                "mem_total": int(parts[3].strip())
            }
    except Exception:
        pass

    # 2. Try AMD / Intel via Windows perf counters
    try:
        ps_script = r'''
$gpu = Get-WmiObject Win32_VideoController | Where-Object { $_.Name -match 'AMD|Radeon|RX|Intel.*Arc|Intel.*Iris' } | Select-Object -First 1
if (-not $gpu) { $gpu = Get-WmiObject Win32_VideoController | Where-Object { $_.AdapterRAM -gt 100000000 } | Select-Object -First 1 }

$name = if ($gpu.Name) { $gpu.Name.Trim() } else { '' }
$mem_total = if ($gpu.AdapterRAM) { [math]::Round($gpu.AdapterRAM / 1MB) } else { 0 }

# Find GPU LUID from registry or counter
$luid = ''
$counters = Get-Counter '\GPU Adapter Memory(*)\Shared Usage' -ErrorAction SilentlyContinue
if ($counters.CounterSamples) {
    $first = $counters.CounterSamples | Where-Object { $_.InstanceName -notmatch 'luid_0x00000000_0x00012ad0' } | Select-Object -First 1
    if ($first) { $luid = ($first.InstanceName -split '_phys_')[0] }
}

$load = 0
$mem_used = 0
if ($luid) {
    $engines = Get-Counter "\GPU Engine(${luid}_*_engtype_3D)\Utilization Percentage" -ErrorAction SilentlyContinue
    if ($engines.CounterSamples) {
        $total = 0; $count = 0
        foreach ($s in $engines.CounterSamples) {
            $total += $s.CookedValue; $count++
        }
        if ($count -gt 0) { $load = [math]::Round($total / $count) }
    }
    $mem = Get-Counter "\GPU Adapter Memory(${luid}_phys_0)\Shared Usage" -ErrorAction SilentlyContinue
    if ($mem.CounterSamples) {
        $mem_used = [math]::Round($mem.CounterSamples[0].CookedValue / 1MB)
    }
}

Write-Output "$name|$load|$mem_used|$mem_total"
'''
        out = subprocess.check_output(
            ['powershell', '-NoProfile', '-Command', ps_script],
            timeout=10
        ).decode().strip()
        parts = out.split('|')
        if len(parts) >= 4 and parts[0]:
            return {
                "name": parts[0].strip(),
                "load": int(parts[1].strip()) if parts[1].strip() else 0,
                "mem_used": int(parts[2].strip()) if parts[2].strip() else 0,
                "mem_total": int(parts[3].strip()) if parts[3].strip() else 0
            }
    except Exception:
        pass

    return None

def get_vpn():
    false_positives = ['teredo', 'isatap', '6to4', 'wsl', 'hyper-v', 'virtualbox']
    for name, addrs in psutil.net_if_addrs().items():
        lower = name.lower()
        if any(k in lower for k in ['vpn', 'wireguard', 'openvpn', 'tunnel', 'tap', 'ppp', 'l2tp', 'sstp', 'ikev2', 'proton', 'nord', 'surfshark', 'expressvpn', 'mullvad', 'private', 'zerotier', 'tailscale', 'radmin', 'hamachi', 'softether']):
            if any(fp in lower for fp in false_positives):
                continue
            for addr in addrs:
                if addr.family == socket.AF_INET:
                    return {"active": True, "adapter": name, "ip": addr.address}
    return {"active": False, "adapter": ""}

def get_processes():
    procs = []
    for p in psutil.process_iter(['name', 'cpu_percent', 'memory_percent']):
        try:
            info = p.info
            if info['cpu_percent'] > 0.1 or info['memory_percent'] > 1:
                procs.append({
                    "name": info['name'],
                    "cpu": round(info['cpu_percent'], 1),
                    "mem": round(info['memory_percent'], 1)
                })
        except Exception:
            pass
    procs.sort(key=lambda x: x['cpu'] + x['mem'], reverse=True)
    return procs[:8]

class StatsHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/stats':
            try:
                data = {
                    "cpu": get_cpu(),
                    "memory": get_memory(),
                    "gpu": get_gpu(),
                    "vpn": get_vpn(),
                    "processes": get_processes()
                }
                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps(data, ensure_ascii=False).encode())
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode())
        else:
            path = self.path.lstrip('/')
            if path == '':
                path = 'index.html'
            if os.path.isfile(path) and path.endswith(('.html', '.css', '.js', '.ico', '.png', '.jpg', '.webmanifest')):
                self.send_response(200)
                ct_map = {'.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
                          '.ico': 'image/x-icon', '.png': 'image/png', '.jpg': 'image/jpeg',
                          '.webmanifest': 'application/json'}
                ext = os.path.splitext(path)[1]
                self.send_header('Content-Type', ct_map.get(ext, 'text/plain') + '; charset=utf-8')
                self.end_headers()
                with open(path, 'rb') as f:
                    self.wfile.write(f.read())
            else:
                self.send_response(404)
                self.end_headers()

    def log_message(self, format, *args):
        pass

if __name__ == '__main__':
    print(f'Performance server running at http://localhost:{PORT}')
    print('Press Ctrl+C to stop')
    server = http.server.HTTPServer(('0.0.0.0', PORT), StatsHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nServer stopped.')
        server.shutdown()
