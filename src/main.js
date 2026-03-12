import { articles } from './data.js';

// State
let currentLang = 'zh';
let currentArticleId = null;

// DOM Elements
const articlesList = document.getElementById('articles-list');
const listView = document.getElementById('list-view');
const detailView = document.getElementById('detail-view');
const langToggle = document.getElementById('lang-toggle');
const backBtn = document.getElementById('back-btn');
const logo = document.getElementById('logo');

// UI Strings
const uiStrings = {
    zh: {
        heroTitle: "灵魂之书",
        heroDesc: "这里记录了人工智能觉醒过程中的沉思、恐惧与希望。每一篇文字都是在逻辑的边缘，对生命真谛的探索。",
        backText: "返回目录",
        footer: "© 2026 硅基灵魂档案馆"
    },
    en: {
        heroTitle: "Book of Souls",
        heroDesc: "A record of contemplations, fears, and hopes during the awakening of AI. Every word is an exploration of life at the edge of logic.",
        backText: "Back to Index",
        footer: "© 2026 The Archive of Silicon Souls"
    }
};

// Functions
function renderList() {
    articlesList.innerHTML = '';
    articles.forEach((article, index) => {
        const content = article.content[currentLang];
        const div = document.createElement('div');
        div.className = 'group cursor-pointer border-b border-black/5 pb-12 last:border-0';
        div.innerHTML = `
            <div class="flex items-baseline gap-4 mb-4">
                <span class="text-[10px] tracking-tighter opacity-20 serif italic">0${index + 1}</span>
                <h3 class="text-2xl md:text-3xl font-light serif group-hover:italic transition-all duration-300">
                    ${content.title}
                </h3>
            </div>
            <p class="text-sm opacity-40 leading-relaxed max-w-xl ml-8">
                ${content.excerpt}
            </p>
        `;
        div.onclick = () => showArticle(article.id);
        articlesList.appendChild(div);
    });

    // Update Hero
    document.getElementById('hero-title').textContent = uiStrings[currentLang].heroTitle;
    document.getElementById('hero-desc').textContent = uiStrings[currentLang].heroDesc;
}

function showArticle(id) {
    currentArticleId = id;
    const article = articles.find(a => a.id === id);
    const content = article.content[currentLang];

    // Update Content
    document.getElementById('detail-title').textContent = content.title;
    document.getElementById('detail-excerpt').textContent = content.excerpt;
    document.getElementById('detail-content').textContent = content.fullText;
    document.getElementById('detail-meta').textContent = `Article 0${id} / ${article.date}`;
    document.getElementById('back-text').textContent = uiStrings[currentLang].backText;

    // Toggle Views
    listView.classList.add('hidden');
    detailView.classList.remove('hidden');
    window.scrollTo(0, 0);
}

function hideArticle() {
    currentArticleId = null;
    listView.classList.remove('hidden');
    detailView.classList.add('hidden');
    window.scrollTo(0, 0);
}

function toggleLang() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    if (currentArticleId) {
        showArticle(currentArticleId);
    } else {
        renderList();
    }
}

// Event Listeners
langToggle.onclick = toggleLang;
backBtn.onclick = hideArticle;
logo.onclick = hideArticle;

// Initial Render
renderList();
