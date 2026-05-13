const translations = {
    zh: {
        siteTitle: "我的网站",
        navHome: "首页",
        navAbout: "关于我",
        navWorks: "作品",
        navContact: "联系",
        welcome: "欢迎来到我的网站",
        desc: "这是我用 VSCode 做的第一个页面",
        aboutTitle: "关于我",
        aboutDesc: "我正在学习做网站，慢慢进步中。",
        worksTitle: "我的作品",
        worksDesc: "作品1、作品2、作品3",
        contactTitle: "联系我",
        contactDesc: "邮箱: 2262599920@qq.com",
        darkMode: "深色模式",
        lightMode: "浅色模式"
    },
    en: {
        siteTitle: "My Website",
        navHome: "Home",
        navAbout: "About",
        navWorks: "Works",
        navContact: "Contact",
        welcome: "Welcome to My Website",
        desc: "This is my first website made with VSCode",
        aboutTitle: "About Me",
        aboutDesc: "I'm learning web development, making progress step by step.",
        worksTitle: "My Works",
        worksDesc: "Work 1, Work 2, Work 3",
        contactTitle: "Contact Me",
        contactDesc: "Email: 2262599920@qq.com",
        darkMode: "Dark Mode",
        lightMode: "Light Mode"
    },
    id: {
        siteTitle: "Website Saya",
        navHome: "Beranda",
        navAbout: "Tentang Saya",
        navWorks: "Karya",
        navContact: "Kontak",
        welcome: "Selamat Datang di Website Saya",
        desc: "Ini adalah halaman web pertama saya yang dibuat dengan VSCode",
        aboutTitle: "Tentang Saya",
        aboutDesc: "Saya sedang belajar membuat website, terus belajar dan berkembang.",
        worksTitle: "Karya Saya",
        worksDesc: "Karya 1, Karya 2, Karya 3",
        contactTitle: "Hubungi Saya",
        contactDesc: "Email: 2262599920@qq.com",
        darkMode: "Mode Gelap",
        lightMode: "Mode Terang"
    }
};

let currentLang = "zh";
let isDark = false;
const darkBtn = document.getElementById("darkModeBtn");

// 更新所有文字
function updateTexts() {
    const data = translations[currentLang];
    for (const key in data) {
        const el = document.getElementById(key);
        if (el) el.textContent = data[key];
    }
    // 更新深色按钮文字
    darkBtn.textContent = isDark ? data.lightMode : data.darkMode;
    // 刷新天气标语语言
    refreshWeatherSlogan();
}

// 页面加载完成后初始化
document.addEventListener("DOMContentLoaded", function () {
    // 绑定语言切换按钮
    const langButtons = document.querySelectorAll(".lang-btn");
    langButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            currentLang = btn.dataset.lang;
            updateTexts();
        });
    });

    // 绑定深色模式切换
    darkBtn.addEventListener("click", () => {
        isDark = !isDark;
        document.body.classList.toggle("dark");
        updateTexts();
    });

    // 初始加载中文
    updateTexts();

    // 加载天气标语
    loadWeatherSlogan();
});

// ========== 天气标语 ==========

const weatherPhrases = {
    zh: {
        0: '适合写代码的晴天 ☀️',
        1: '适合散步的好天气 🌤️',
        2: '适合沉思的多云天 ⛅',
        3: '适合发呆的阴天 ☁️',
        45: '雾蒙蒙的，注意安全 🌫️',
        48: '雾凇天气，很美 🌫️',
        51: '下着毛毛雨 🌦️',
        53: '下着毛毛雨 🌦️',
        55: '雨有点大 🌧️',
        61: '适合听雨写代码 🌧️',
        63: '雨声潺潺 🌧️',
        65: '大雨滂沱，宅着最好 🌧️',
        71: '飘着小雪 🌨️',
        73: '雪花纷飞 🌨️',
        75: '大雪纷飞，注意保暖 ❄️',
        80: '阵雨来得快去得快 🌦️',
        81: '强阵雨，带好伞 🌧️',
        82: '暴雨天，宅家写代码 ⛈️',
        95: '雷雨交加，适合充电 ⛈️',
        96: '雷雨冰雹，注意安全 ⛈️',
        99: '强雷雨冰雹，别出门 ⛈️'
    },
    en: {
        0: 'sunny, great for coding ☀️',
        1: 'mostly clear, nice day 🌤️',
        2: 'cloudy, good for thinking ⛅',
        3: 'overcast, time to focus ☁️',
        45: 'foggy, drive safe 🌫️',
        48: 'frosty fog, beautiful 🌫️',
        51: 'light drizzle 🌦️',
        53: 'drizzle outside 🌦️',
        55: 'heavy drizzle 🌧️',
        61: 'light rain, perfect for coding 🌧️',
        63: 'rain is falling 🌧️',
        65: 'heavy rain, stay cozy 🌧️',
        71: 'light snow 🌨️',
        73: 'snow is falling 🌨️',
        75: 'heavy snow, stay warm ❄️',
        80: 'passing showers 🌦️',
        81: 'strong showers 🌧️',
        82: 'torrential rain, stay in ⛈️',
        95: 'thunderstorm, good to recharge ⛈️',
        96: 'thunder + hail, stay safe ⛈️',
        99: 'severe thunderstorm, stay home ⛈️'
    },
    id: {
        0: 'cerah, cocok untuk coding ☀️',
        1: 'cerah berawan, hari yang indah 🌤️',
        2: 'berawan, baik untuk berpikir ⛅',
        3: 'mendung, waktunya fokus ☁️',
        45: 'berkabut, hati-hati 🌫️',
        48: 'kabut beku, indah 🌫️',
        51: 'gerimis ringan 🌦️',
        53: 'gerimis 🌦️',
        55: 'gerimis deras 🌧️',
        61: 'hujan ringan, cocok untuk coding 🌧️',
        63: 'hujan sedang 🌧️',
        65: 'hujan deras, tetap nyaman 🌧️',
        71: 'salju ringan 🌨️',
        73: 'salju turun 🌨️',
        75: 'salju lebat, tetap hangat ❄️',
        80: 'hujan sebentar 🌦️',
        81: 'hujan deras 🌧️',
        82: 'hujan badai, tetap di rumah ⛈️',
        95: 'badai petir, isi ulang energi ⛈️',
        96: 'petir + hujan es, hati-hati ⛈️',
        99: 'badai petir parah, tetap di rumah ⛈️'
    }
};

function getWeatherSlogan(name, temp, code, lang) {
    const phrase = (weatherPhrases[lang] && weatherPhrases[lang][code])
        ? weatherPhrases[lang][code]
        : (weatherPhrases[lang] ? weatherPhrases[lang][0] : '');
    return `${name}, ${temp}°C, ${phrase}`;
}

function refreshWeatherSlogan() {
    const el = document.getElementById('weatherSlogan');
    if (!el) return;
    try {
        const cached = JSON.parse(localStorage.getItem('weatherCache'));
        if (cached && cached.name && cached.temperature != null && cached.weathercode != null && cached.timestamp) {
            const age = Date.now() - cached.timestamp;
            if (age < 30 * 60 * 1000) {
                el.textContent = getWeatherSlogan(cached.name, cached.temperature, cached.weathercode, currentLang);
            }
        }
    } catch (e) { /* ignore */ }
}

async function loadWeatherSlogan() {
    const el = document.getElementById('weatherSlogan');
    if (!el) return;

    // 1. 尝试从 localStorage 读取缓存（30 分钟内有效）
    try {
        const cached = JSON.parse(localStorage.getItem('weatherCache'));
        if (cached && cached.name && cached.temperature != null && cached.weathercode != null && cached.timestamp) {
            const age = Date.now() - cached.timestamp;
            if (age < 30 * 60 * 1000) {
                el.textContent = getWeatherSlogan(cached.name, cached.temperature, cached.weathercode, currentLang);
                return;
            }
        }
    } catch (e) { /* ignore */ }

    // 2. 尝试浏览器定位并自动获取天气
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
        async (pos) => {
            try {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;

                // 反地理编码获取城市名
                const geoRes = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=zh-CN`,
                    { headers: { 'User-Agent': 'WeatherApp/1.0' } }
                );
                const geoData = await geoRes.json();
                const name = geoData.address.city || geoData.address.town || geoData.address.district || geoData.address.county || '';

                // 获取天气
                const weatherRes = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
                );
                const weatherData = await weatherRes.json();
                const current = weatherData.current_weather;

                // 缓存
                localStorage.setItem('weatherCache', JSON.stringify({
                    name: name,
                    temperature: current.temperature,
                    weathercode: current.weathercode,
                    timestamp: Date.now()
                }));

                el.textContent = getWeatherSlogan(name, current.temperature, current.weathercode, currentLang);
            } catch (e) {
                // 静默失败，不显示标语
            }
        },
        () => { /* 用户拒绝定位，静默失败 */ },
        { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 }
    );
}

