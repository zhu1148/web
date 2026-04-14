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
});