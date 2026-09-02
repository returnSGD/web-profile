# 网站更新指南

> 一句话：**改文件 → push 到 GitHub → Cloudflare 自动构建上线**。全程不用碰 Cloudflare。

网站地址：<https://returnsgd.pages.dev/>
仓库地址：<https://github.com/returnSGD/web-profile>

---

## 一、前置准备（只需要做一次）

需要本地装好：

- [Node.js](https://nodejs.org/)（20 或更高）
- [Git](https://git-scm.com/)

如果还没把仓库拉到本地：

```bash
git clone https://github.com/returnSGD/web-profile.git
cd web-profile
npm install
```

> 如果你已经在这个项目目录里（比如 `D:\returnSGD`），跳过这一步，直接改文件即可。

---

## 二、日常更新三步走

### 第 1 步：改文件

99% 的文案改动都只动一个文件：**`src/data/resume.ts`**（它是全站唯一内容源）。
具体改哪个字段，见下面「改什么内容改哪个文件」。

### 第 2 步：本地预览，确认没问题

```bash
npm run dev
```

浏览器打开 <http://localhost:5173> 看效果，改完按 `Ctrl+C` 退出。

（可选）顺手确认构建能通过：

```bash
npm run build
```

### 第 3 步：push 上线

```bash
git add .
git commit -m "更新：改了 xxx"
git push
```

push 之后 **30~60 秒**，<https://returnsgd.pages.dev/> 自动更新，刷新即可看到。

---

## 三、改什么内容改哪个文件

### 内容源：`src/data/resume.ts`

| 想改什么 | 改哪个字段 | 说明 |
|---|---|---|
| 姓名 / 英文名 / 定位 / 主线句 / GitHub | `profile` | 文件顶部 |
| 邮箱 | `emailParts` | 拆成 `user` + `domain` 两段，运行时拼接（防爬虫） |
| 「关于我」的三段正文 / 头衔 | `about.paragraphs` / `about.meta` | |
| 经历时间线 | `timeline` 数组 | 每项：`year` / `period` / `org` / `role` / `detail` / `keywords` |
| 大项目（3 个，含架构图） | `featuredProjects` | `diagram` 字段控制是否显示架构图 |
| 小项目（5 个） | `secondaryProjects` | |
| 开源贡献 | `contributions` | 含 `stars` / `status` / `stats` / `links` |
| 研究方向 | `interests` | |
| 技术栈 | `stack` | |
| 奖项 | `awards` | |
| 导航项 | `navItems` | |

### 其他文件

| 想改什么 | 文件 |
|---|---|
| 配色（设计 token） | `src/index.css` 的 `@theme` 部分 |
| 标题 / 描述 / SEO 关键词 | `index.html` |
| 页面结构、组件 | `src/App.tsx`、`src/components/` |
| 大项目的架构图 | `src/components/ProjectDiagram.tsx` |

---

## 四、几个常见场景

### 1. 改一段经历

打开 `src/data/resume.ts`，找到 `timeline` 数组，改对应那段的 `detail` / `role` 等文字，保存即可。

### 2. 新增一个项目

在 `featuredProjects`（大项目）或 `secondaryProjects`（小项目）数组里**复制一个对象**，改里面的字段：

- 大项目要配架构图：在 `ProjectDiagram.tsx` 里加一个绘制函数，并把它的 key 加进 `DiagramKind` 联合类型和 `map` 对象；
- 不配图：把 `diagram` 设为 `null`。

### 3. 改邮箱

改 `emailParts` 里的 `user` 和 `domain` 两段（比如 `user: 'xxx'`、`domain: 'gmail.com'`），不要写成一个完整字符串。

### 4. 加简历 PDF 下载入口

1. 把 PDF 文件放进 `public/` 文件夹；
2. 在 `src/components/Hero.tsx` 或 `Contact.tsx` 里加一条链接指向它（用 `/简历.pdf` 这种路径）。

### 5. 加图片 / 图标

把图片放进 `public/` 文件夹，用相对路径 `/xxx.png` 引用，Vite 构建时会自动带上。

---

## 五、本地命令速查

| 命令 | 作用 |
|---|---|
| `npm install` | 首次 clone 后、或依赖变化后安装依赖 |
| `npm run dev` | 本地开发预览（改代码实时刷新） |
| `npm run build` | 构建，产物在 `dist/`，用来验证能否通过 |
| `npm run preview` | 预览构建出来的产物 |

---

## 六、部署失败怎么办

1. 打开 Cloudflare → **Workers & Pages** → `returnsgd` → **Deployments**；
2. 点最新那条部署，看 **Logs（日志）**；
3. 常见原因：
   - 代码写错导致 `tsc` 或 `vite` 报错 → 本地先跑一遍 `npm run build` 排查；
   - 构建命令 / 输出目录被误改 → 正确值是 `npm run build` + `dist`；
4. 把日志贴出来，让 AI（或我）帮忙看。

---

## 七、注意事项

- ❌ **不要**提交 `node_modules/` 和 `dist/`——已经写进 `.gitignore`，会自动忽略；
- ❌ **不要**手动改 `dist/` 里的东西——每次构建都会被覆盖，改了也白改；
- ❌ **不要**改 `index.html` 里 `<link rel="canonical" ...>` 的 `href`（必须保持绝对网址，否则会触发构建报错）；
- ✅ 改完先在本地 `npm run dev` 看效果，确认没问题再 push；
- ✅ commit 信息写清楚改了什么，方便以后回看。
