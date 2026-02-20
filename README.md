# Hexo Theme Bento

一个现代化的 Bento Grid 风格 Hexo 主题，灵感来自现代设计趋势。

## 特性

- 🎨 优雅的 Bento Grid 布局展示技能/项目
- 📱 完全响应式设计
- ⚡ 极简主义设计，性能优化
- 🎯 专注于内容展示
- 🌈 可定制的配色方案

## 安装

1. 将主题文件夹复制到 Hexo 博客的 `themes` 目录：
```bash
git clone https://github.com/yourusername/hexo-theme-bento.git themes/bento-theme
```

2. 修改 Hexo 配置文件 `_config.yml`：
```yaml
theme: bento-theme
```

## 配置

在 `themes/bento-theme/_config.yml` 中配置主题选项：

### 站点设置
```yaml
site:
  title: S.K.
  subtitle: Digital Craftsman
  description: Designing logic, crafting aesthetics.
  author: S.K.
```

### 导航菜单
```yaml
menu:
  - name: Work
    url: /
  - name: Journal
    url: /archives/
  - name: About
    url: /about/
```

### Hero 区域
```yaml
hero:
  status:
    enabled: true
    text: Available for freelance projects
    dot_color: "#2ecc71"
  title: Designing logic,<br><span>crafting</span> aesthetics.
  intro: 你的介绍文字...
```

### 技能展示 (Bento Grid)
```yaml
skills:
  enabled: true
  title: The Toolkit
  items:
    - type: core
      layout: item-lg
      label: Core Stack
      title: Frontend & Architecture
      tags: ["React", "Vue 3", "TypeScript", "Next.js", "Tailwind"]
    # 添加更多技能项...
```

### 博客设置
```yaml
blog:
  enabled: true
  title: Latest Notes
  per_page: 10
```

### 页脚
```yaml
footer:
  social:
    - name: Twitter / X
      url: "#"
    - name: GitHub
      url: "#"
  contact:
    - name: hello@example.com
      url: "mailto:hello@example.com"
```

## 页面模板

主题包含以下页面模板：

- `index.ejs` - 首页（包含 Hero、技能展示、文章列表）
- `post.ejs` - 文章详情页
- `archive.ejs` - 归档页

## 自定义样式

所有样式都在 `source/css/style.css` 中。你可以通过修改 CSS 变量来自定义配色：

```css
:root {
    --bg-color: #f4f2ed;
    --text-main: #1a1a1a;
    --text-muted: #666;
    --accent: #d95d39;
    --card-bg: #ffffff;
}
```

## 创建文章

使用 Hexo 标准命令创建文章：

```bash
hexo new post "文章标题"
```

## 开发

```bash
# 清除缓存
hexo clean

# 生成静态文件
hexo generate

# 启动本地服务器
hexo server
```

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 许可证

MIT License

## 致谢

灵感来自现代 Web 设计趋势和 Bento Grid 布局。