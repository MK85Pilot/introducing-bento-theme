(function() {
    // 等待 DOM 加载完成
    document.addEventListener('DOMContentLoaded', function() {
        // 查找所有代码块的 figure 元素
        const codeBlocks = document.querySelectorAll('.article-content figure.highlight');
        
        codeBlocks.forEach(function(figure) {
            // 提取语言标签和文件路径信息
            const codeElement = figure.querySelector('code');
            if (codeElement && codeElement.className) {
                // 从 class 中提取语言
                const classList = codeElement.className.split(' ');
                for (let i = 0; i < classList.length; i++) {
                    if (classList[i].startsWith('language-')) {
                        const lang = classList[i].replace('language-', '');
                        figure.setAttribute('data-lang', lang);
                        break;
                    }
                }
                
                // 从代码内容的第一行查找 @file 指令
                const codeContent = codeElement.textContent;
                const firstLine = codeContent.split('\n')[0].trim();
                
                // 匹配 // @file path 或 # @file path 或 /* @file path */
                const fileMatch = firstLine.match(/^(\/\/|#|\/\*\s*)@file\s+(.+?)(\s*\*\/)?$/);
                if (fileMatch) {
                    const filePath = fileMatch[2].trim();
                    figure.setAttribute('data-file', filePath);
                    figure.classList.add('has-file-info');
                }
            }
        });
    });
})();
