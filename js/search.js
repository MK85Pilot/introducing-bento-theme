// 搜索功能实现
(function() {
    'use strict';

    let searchModal = null;
    let searchBtn = null;
    let searchOverlay = null;
    let searchClose = null;
    let searchInput = null;
    let searchResults = null;
    let searchLoading = null;
    let searchEmpty = null;
    let searchData = null;

    // 初始化搜索
    function initSearch() {
        // 加载搜索索引
        fetch('/search.xml')
            .then(response => response.text())
            .then(str => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(str, 'text/xml');
                const entries = xmlDoc.getElementsByTagName('entry');
                
                searchData = Array.from(entries).map(entry => ({
                    title: entry.getElementsByTagName('title')[0]?.textContent || '',
                    content: entry.getElementsByTagName('content')[0]?.textContent || '',
                    url: entry.getElementsByTagName('url')[0]?.textContent || '',
                    date: entry.getElementsByTagName('date')[0]?.textContent || ''
                }));

                searchLoading.style.display = 'none';
                searchEmpty.style.display = 'block';
            })
            .catch(error => {
                console.error('加载搜索索引失败:', error);
                searchLoading.textContent = '搜索索引加载失败';
            });
    }

    // 执行搜索
    function performSearch(query) {
        if (!searchData || !query.trim()) {
            searchResults.innerHTML = '';
            searchEmpty.style.display = 'block';
            searchEmpty.textContent = query.trim() ? '未找到相关文章' : '输入关键词开始搜索';
            return;
        }

        const keywords = query.toLowerCase().split(/\s+/).filter(k => k.length > 0);
        const results = [];

        searchData.forEach(item => {
            const title = item.title.toLowerCase();
            const content = stripHtml(item.content).toLowerCase();
            let score = 0;
            let matched = false;

            keywords.forEach(keyword => {
                // 标题匹配权重更高
                if (title.includes(keyword)) {
                    score += 10;
                    matched = true;
                }
                // 内容匹配
                if (content.includes(keyword)) {
                    score += 1;
                    matched = true;
                }
            });

            if (matched) {
                results.push({ ...item, score });
            }
        });

        // 按相关性排序
        results.sort((a, b) => b.score - a.score);

        displayResults(results, keywords);
    }

    // 移除HTML标签
    function stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    // 高亮关键词
    function highlightKeywords(text, keywords) {
        keywords.forEach(keyword => {
            const regex = new RegExp(`(${keyword})`, 'gi');
            text = text.replace(regex, '<mark>$1</mark>');
        });
        return text;
    }

    // 显示搜索结果
    function displayResults(results, keywords) {
        if (results.length === 0) {
            searchResults.innerHTML = '';
            searchEmpty.style.display = 'block';
            searchEmpty.textContent = '未找到相关文章';
            return;
        }

        searchEmpty.style.display = 'none';

        const html = results.map(item => {
            const title = highlightKeywords(item.title, keywords);
            const content = stripHtml(item.content);
            const contentSnippet = content.length > 200 
                ? content.substring(0, 200) + '...' 
                : content;
            const highlightedContent = highlightKeywords(contentSnippet, keywords);

            return `
                <a href="${item.url}" class="search-result-item">
                    <div class="search-result-title">${title}</div>
                    <div class="search-result-content">${highlightedContent}</div>
                    <div class="search-result-meta">
                        <span class="search-result-date">${item.date}</span>
                    </div>
                </a>
            `;
        }).join('');

        searchResults.innerHTML = html;
    }

    // 打开搜索框
    function openSearch() {
        searchModal.classList.add('active');
        searchInput.focus();
        document.body.style.overflow = 'hidden';
    }

    // 关闭搜索框
    function closeSearch() {
        searchModal.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
        searchEmpty.style.display = 'block';
        document.body.style.overflow = '';
    }

    // 初始化函数
    function init() {
        // 获取DOM元素并赋值给外部变量
        searchModal = document.getElementById('search-modal');
        searchBtn = document.getElementById('search-btn');
        searchOverlay = document.getElementById('search-overlay');
        searchClose = document.getElementById('search-close');
        searchInput = document.getElementById('search-input');
        searchResults = document.getElementById('search-results');
        searchLoading = document.getElementById('search-loading');
        searchEmpty = document.getElementById('search-empty');

        // 检查元素是否存在
        if (!searchModal || !searchBtn || !searchOverlay || !searchClose || !searchInput) {
            console.error('搜索功能：缺少必要的DOM元素');
            return;
        }

        // 事件监听
        searchBtn.addEventListener('click', openSearch);
        searchOverlay.addEventListener('click', closeSearch);
        searchClose.addEventListener('click', closeSearch);

        // 搜索输入
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(e.target.value);
            }, 300);
        });

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            // ESC 关闭搜索
            if (e.key === 'Escape' && searchModal.classList.contains('active')) {
                closeSearch();
            }
            // Ctrl/Cmd + K 打开搜索
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                openSearch();
            }
        });

        // 初始化搜索
        initSearch();
    }

    // 等待DOM加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
