// 图片加载失败处理
document.addEventListener('DOMContentLoaded', function() {
    // 处理文章内容中的所有图片
    const articleImages = document.querySelectorAll('.article-content img');
    
    articleImages.forEach(function(img) {
        // 检查图片是否已经加载失败
        if (img.complete && img.naturalHeight === 0) {
            handleImageError(img);
        }
        
        // 监听图片加载错误
        img.addEventListener('error', function() {
            handleImageError(this);
        });
    });
    
    // 动态添加的图片也需要处理（使用 MutationObserver）
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) {
                    // 如果是 img 标签
                    if (node.tagName === 'IMG') {
                        node.addEventListener('error', function() {
                            handleImageError(this);
                        });
                    }
                    // 如果包含图片
                    const images = node.querySelectorAll && node.querySelectorAll('img');
                    if (images) {
                        images.forEach(function(img) {
                            img.addEventListener('error', function() {
                                handleImageError(this);
                            });
                        });
                    }
                }
            });
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
});

// 处理图片错误
function handleImageError(img) {
    // 避免重复处理
    if (img.dataset.errorHandled === 'true') {
        return;
    }
    
    img.dataset.errorHandled = 'true';
    
    // 创建错误提示容器
    const errorContainer = document.createElement('div');
    errorContainer.className = 'image-error-container';
    
    // 创建图标
    const icon = document.createElement('div');
    icon.className = 'image-error-icon';
    icon.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
        </svg>
    `;
    
    // 创建错误文本
    const text = document.createElement('div');
    text.className = 'image-error-text';
    text.textContent = '图片加载失败';
    
    // 创建副文本
    const subText = document.createElement('div');
    subText.className = 'image-error-subtext';
    subText.textContent = img.alt || '无法显示此图片';
    
    // 组装容器
    errorContainer.appendChild(icon);
    errorContainer.appendChild(text);
    errorContainer.appendChild(subText);
    
    // 替换原图
    img.parentNode.replaceChild(errorContainer, img);
}