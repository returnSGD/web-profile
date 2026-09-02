# 许政 · Personal Portfolio

一个中文 editorial 风格的个人作品集单页。所有内容均来自本人简历，未作虚构或夸大。

## 运行

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 产物在 dist/，纯静态，可丢到任何静态托管
npm run preview  # 本地预览构建产物
```

## 目录结构

```
src/
├─ data/resume.ts          ← 唯一内容源。改文案只改这里
├─ index.css               ← 设计 token（@theme）+ 基础样式 + 打印样式
├─ App.tsx
├─ hooks/
│  └─ useReducedMotion.ts
└─ components/
   ├─ Section.tsx          共用的 editorial 双栏骨架（左英文标签 / 右中文内容）
   ├─ Reveal.tsx           全站唯一的滚动揭示原语
   ├─ Nav.tsx              滚动变半透明 + scroll-spy + 移动端全屏菜单
   ├─ Hero.tsx
   ├─ SystemCanvas.tsx     首屏「数据→模型→智能体→系统」可视化
   ├─ About.tsx
   ├─ Experience.tsx       年份作视觉锚点的 Timeline
   ├─ Projects.tsx         3 个大卡（含架构图）+ 5 个小卡
   ├─ ProjectDiagram.tsx   三张内联 SVG 架构图
   ├─ OpenSource.tsx
   ├─ Research.tsx
   ├─ Stack.tsx
   ├─ Awards.tsx
   └─ Contact.tsx
```

## 改内容

绝大多数改动只需要动 `src/data/resume.ts`：

| 想改什么 | 改哪个导出 |
|---|---|
| 姓名 / 定位 / 主线句 / GitHub | `profile` |
| 邮箱 | `emailParts`（拆成两段存，运行时拼接，防爬虫） |
| 关于我的三段正文 | `about.paragraphs` |
| 时间线 | `timeline` |
| 项目（大卡 / 小卡） | `featuredProjects` / `secondaryProjects` |
| 开源贡献与数字 | `contributions`（`stats` 只填简历里确有的数字） |
| 研究方向 | `interests` |
| 技术栈 | `stack` |
| 奖项 | `awards` |
| 导航项 | `navItems` |

新增一个 featured 项目若要配架构图，在 `ProjectDiagram.tsx` 里加一个绘制函数，
并把它的 key 加进 `DiagramKind` 联合类型与 `map` 对象。不配图就把 `diagram` 设为 `null`。

## 设计约定

**配色**（`index.css` 的 `@theme`，全站不出现暗色主题）

| Token | 值 | 用途 |
|---|---|---|
| `bg` | `#FAFAF8` | 暖白底 |
| `surface` | `#F3F3F0` | 小卡与页脚底 |
| `ink` / `ink-2` / `ink-3` | `#181818` / `#6B6B6B` / `#9E9E98` | 三级文字 |
| `line` / `line-strong` | `#E8E8E5` / `#D8D8D3` | 分隔线 |
| `accent` | `#2B4C86` | 低饱和墨蓝，取自简历 LaTeX 的 `#2864B5` 降饱和 |

accent 全站只出现在四处：链接、Timeline 年份 hover、Canvas 连线、开源「已合并」标记。

**字体**

- 中文走系统字体栈（PingFang SC → HarmonyOS Sans SC → 微软雅黑），零体积
- 英文与 UI 用 Inter，年份数字用 Instrument Serif
- 两者都通过 `@fontsource` **自托管**，不请求 Google Fonts —— 国内访问不会卡字体

**动效**

- 滚动揭示只有一种：`opacity 0→1` + `translateY 16px→0`，600ms，`cubic-bezier(0.22,1,0.36,1)`
- `blur→sharp` 全站只用一次，在 Hero 标题
- `prefers-reduced-motion` 下：Canvas 只画一帧静态图，Framer Motion 通过 `MotionConfig reducedMotion="user"` 去掉位移
- Canvas 离屏（IntersectionObserver）与标签页隐藏时完全停止渲染

## 已验证

- 4× CPU 降频下首屏动画稳定 60fps，零长帧（>33ms），FCP 132ms
- 移动端 390px 无横向溢出
- 单个 `<h1>`、语义化 landmark、外链均带 `rel="noreferrer noopener"`、跳转到主内容的 skip link
- 邮箱不出现在静态 HTML 中，构建产物里也不存在拼好的完整地址
- 打印 / 存 PDF 时强制展开所有滚动揭示内容，并在外链后附上 URL

## 待补

- Hero 与页脚可以加一个「简历 PDF」下载入口：把 PDF 放进 `public/`，
  然后在 `Hero.tsx` 的 `HeroLink` 与 `Contact.tsx` 里加一条链接即可。
  当前没有加，是因为仓库里还没有这份 PDF —— 不链接不存在的文件。
