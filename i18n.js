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
        contactDesc: "邮箱：2262599920@qq.com"
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
        contactDesc: "Email: 2262599920@qq.com"
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
        contactDesc: "Email: 2262599920@qq.com"
    }

};

let currentLang = "zh";

// 更新页面文字
function updateTexts() {
    const data = translations[currentLang];
    for (const id in data) {
        const el = document.getElementById(id);
        if (el) el.textContent = data[id];
    }
}

// 切换语言
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".lang-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            currentLang = btn.dataset.lang;
            updateTexts();
        });
    });

    // 初始加载
    updateTexts();
});