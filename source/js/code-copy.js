// 代码块复制功能
(function() {
    'use strict';

    // 创建Toast容器
    function createToastContainer() {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    }

    // 显示Toast提示
    function showToast(message) {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = createToastContainer();
        }

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-icon"></div>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        // 触发动画
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // 2秒后隐藏
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 2000);
    }

    // 复制文本到剪贴板
    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // 降级方案
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                textArea.remove();
                return true;
            } catch (err) {
                textArea.remove();
                return false;
            }
        }
    }

    // 为代码块添加复制按钮
    function addCopyButtons() {
        const codeBlocks = document.querySelectorAll('.article-content pre');
        
        codeBlocks.forEach(block => {
            // 检查是否已经有复制按钮
            if (block.querySelector('.code-copy-btn')) {
                return;
            }

            const codeElement = block.querySelector('code');
            if (!codeElement) return;

            // 创建复制按钮
            const button = document.createElement('button');
            button.className = 'code-copy-btn';
            button.innerHTML = '📋 复制';
            button.setAttribute('aria-label', '复制代码');
            button.setAttribute('type', 'button');

            // 点击事件
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                const code = codeElement.textContent || codeElement.innerText;
                
                const success = await copyToClipboard(code);
                
                if (success) {
                    button.classList.add('copied');
                    button.innerHTML = '✓ 已复制';
                    showToast('代码已复制到剪贴板');
                    
                    // 2秒后恢复按钮状态
                    setTimeout(() => {
                        button.classList.remove('copied');
                        button.innerHTML = '📋 复制';
                    }, 2000);
                } else {
                    showToast('复制失败，请手动复制');
                }
            });

            block.appendChild(button);
        });
    }

    // 初始化
    function init() {
        addCopyButtons();
        
        // 使用MutationObserver监听DOM变化
        // 这对于动态加载的内容很有用
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0) {
                    addCopyButtons();
                }
            });
        });

        // 观察文章内容区域
        const articleContent = document.querySelector('.article-content');
        if (articleContent) {
            observer.observe(articleContent, {
                childList: true,
                subtree: true
            });
        }
    }

    // DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();