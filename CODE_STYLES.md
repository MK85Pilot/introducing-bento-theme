# 代码块样式说明

Bento Theme 采用一套精心设计的代码块样式，遵循通用理想代码块参数模型。

## 设计原则

基于版式系统、字体工程、色彩策略、认知负荷控制四个维度：

- **弱分隔策略** - 使用灰背景而非边框分隔
- **等宽字体** - 确保代码对齐和结构稳定
- **低饱和度配色** - 降低视觉攻击性
- **合理行距** - 行距 1.6，字号 0.95rem
- **充足留白** - padding 20px，增强呼吸感

## 样式参数

```css
背景：#f6f8fa（低明度灰 L≈96%）
正文：#24292e（深灰，非纯黑）
字体：SF Mono, Monaco, Consolas（等宽）
字号：0.95rem（约15px）
行距：1.6
圆角：6px
padding：20px
```

## 代码块标题（文件路径）

### 使用方法

在代码的第一行使用 `@file` 注释指令：

**JavaScript/TypeScript/CSS/HTML:**
```markdown
\```javascript
// @file /src/components/Header.js
function hello() {
    console.log("Hello World");
}
\```
```

**Python/Shell/Ruby:**
```markdown
\```python
# @file /utils/helpers.py
def hello():
    print("Hello")
\```
```

### 标题栏效果

当检测到 `@file` 指令时，会自动显示：
- 顶部标题栏，显示文件路径
- 淡蓝色背景 (#f1f8ff)
- 底部边框分隔
- 代码区域自动下移

### 示例对比

**无文件路径：**
```javascript
console.log("Hello World");
```

**有文件路径：**
```javascript
// @file /src/utils/logger.js
console.log("Hello World");
```

## 语法高亮配色

采用低饱和度配色方案：

- **注释** - #6a737d（灰色，斜体）
- **关键词** - #d73a49（深红色，加粗）
- **字符串** - #032f62（深蓝色）
- **函数名** - #6f42c1（紫色）
- **数字** - #005cc5（蓝色）
- **操作符** - #24292e（深灰）

## 技术实现

- **等宽字体** - 优先使用 SF Mono，降级到 Monaco、Menlo、Consolas
- **Token 高亮** - 基于 Prism.js 的语法高亮
- **响应式设计** - 移动端优化，横向滚动
- **复制功能** - 内置代码复制按钮

## 适用场景

✅ 技术博客和代码教程  
✅ 多文件项目的代码示例  
✅ 需要展示文件结构的文档  
✅ 代码审查和对比  

---

*设计理念：将抽象结构转化为可感知秩序 - 秩序感 + 稳定节奏 + 克制对比*