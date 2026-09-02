/**
 * Single source of truth for every piece of content on the site.
 * Everything here traces back to the résumé — nothing is invented.
 * Star counts and PR states are as stated in the résumé (see STAR_DATA_ASOF).
 */

export const STAR_DATA_ASOF = '2026.08'

/* ── Identity ──────────────────────────────────────────── */

export const profile = {
  name: '许政',
  nameLatin: 'Xu Zheng',
  focus: ['推荐系统', '强化学习', 'LLM Agent'],
  /** The thread that runs through every project below. */
  thesis: '我关心智能系统如何在信息有限时做出更好的决策。',
  github: 'https://github.com/returnSGD',
  githubHandle: 'returnSGD',
} as const

/** Split so naive scrapers can't lift it from the static HTML. */
export const emailParts = { user: '2208499028', domain: 'qq.com' } as const
export const email = () => `${emailParts.user}@${emailParts.domain}`

/* ── About ─────────────────────────────────────────────── */

export const about = {
  meta: ['济南大学 · 数据科学与大数据技术', '中国科学院自动化研究所 · 在研'],
  paragraphs: [
    '我在济南大学读数据科学与大数据技术。过去两年，我把同一个问题反复带进每一个项目：当观测是不完整的、反馈是延迟的、算力是有限的，一个系统该如何做出足够好的决策。它可以是推荐系统面对稀疏行为序列时的取舍，可以是强化学习智能体在部分可观测环境下的策略选择，也可以是一个 Agent 在工具调用失败之后如何自我修正。',
    '目前在中国科学院自动化研究所吴书研究员课题组，围绕大模型智能体安全与 AI 辅助学术评审两个方向做研究：聚合主流 Agent 评测数据集并编写可配置的测评脚本，精读 24 篇顶会论文、逐篇提取数据集与 Baseline 并联网核验其中 14 个公开数据集的真实结构与发布状态。我也提出了自己的研究方向——面向专业背景与论文主题错位的评审人，检测其能力缺口，生成画像驱动的领域上下文补课包。',
    '我同样把时间花在别人的代码库里。为 LightRAG、n8n、TensorTrade 等项目提交并合并过 PR，习惯是先补测试再动实现，交付时保证零回归。比起写出更多代码，我更在意删掉多余的那部分——在 LightRAG 那次重构里，新增 973 行测试的同时删掉了 290 行重复逻辑。',
  ],
} as const

/* ── Experience ────────────────────────────────────────── */

export interface TimelineItem {
  year: string
  period: string
  org: string
  role: string
  detail: string
  keywords: string[]
}

export const timeline: TimelineItem[] = [
  {
    year: '2026',
    period: '2026.07 — 至今',
    org: '中国科学院自动化研究所',
    role: '吴书研究员课题组 · 研究实习',
    detail:
      '独立承担文献调研、基准评测与研究思路探索，全程参与组会研讨与科研全流程。系统梳理 LLM Agent 的攻击与防御技术路线，包括提示注入、记忆投毒、后门攻击与表征转向。',
    keywords: ['LLM Agent 安全', 'Benchmark 评测', 'AI 辅助学术评审', '知识图谱'],
  },
  {
    year: '2025',
    period: '2025.05 — 至今',
    org: 'LLM 增强推荐系统研究',
    role: '独立科研',
    detail:
      '复现 P5（Pretrain-Prompt-Predict）框架，针对 Beam Search 效率低且易产生策略崩塌的问题，设计 POMDP 强化学习结合记忆增强的混合推荐架构，并通过四阶段实验系统验证各组件贡献。',
    keywords: ['P5', 'POMDP', 'FAISS 记忆', '消融实验'],
  },
  {
    year: '2024',
    period: '2024.09 — 2028.06',
    org: '济南大学',
    role: '数据科学与大数据技术 · 本科',
    detail:
      '课程之外的时间基本都在推荐算法、强化学习与大模型应用上。数学建模与算法竞赛训练打下了统计建模与工程实现的底子。',
    keywords: ['数据科学', '统计建模', '算法竞赛'],
  },
]

/* ── Projects ──────────────────────────────────────────── */

export type DiagramKind = 'unified' | 'p5rl' | 'cat' | null

export interface Project {
  id: string
  title: string
  org: string
  period: string
  /** One line. What it is, why it exists. */
  lede: string
  /** What I personally built. */
  contributions: { label: string; text: string }[]
  stack: string[]
  outcome?: string
  link?: string
  diagram: DiagramKind
}

export const featuredProjects: Project[] = [
  {
    id: 'unified-rec',
    title: '统一化推荐系统',
    org: '腾讯广告算法大赛 × KDD Cup',
    period: '2026.03 — 2026.05',
    lede:
      '大规模推荐里，序列建模与特征交互长期被拆成两个阶段处理，带来信息损耗与计算冗余。这个项目用一个统一的 Transformer 把两者合并为端到端的单阶段架构。',
    contributions: [
      {
        label: '统一分词策略',
        text: '将用户行为序列与物品属性等异构特征映射至同一语义空间，让跨特征交互得以在同一层深度发生。',
      },
      {
        label: '混合参数化',
        text: '序列 Token 共享参数以提升效率，非序列 Token 保留独立参数以维持语义区分度。',
      },
      {
        label: '金字塔堆叠',
        text: '逐层剪枝配合 KV 缓存复用，将自注意力的计算复杂度从 O(L²) 降至 O(L)。',
      },
    ],
    stack: ['PyTorch', 'Transformer', 'KV Cache', 'OneTrans / MixFormer'],
    outcome: '在百万级交互数据上验证了架构有效性，为大规模工业推荐提供了可行的端到端方案。',
    diagram: 'unified',
  },
  {
    id: 'llm-rec',
    title: 'LLM 增强推荐系统',
    org: '独立科研 · P5 + 强化学习 + 记忆架构',
    period: '2025.05 — 至今',
    lede:
      '复现 P5 生成式推荐框架后，发现 Beam Search 既慢又容易策略崩塌。于是把候选检索交给一个在部分可观测环境下学习的策略网络，并给它配了一套长短期记忆。',
    contributions: [
      {
        label: '基线复现',
        text: '基于 T5 骨干复现 P5 框架，在 Amazon Beauty（22,363 用户 / 12,101 商品 / 5-core 过滤）上完成序列推荐实验。',
      },
      {
        label: '策略网络',
        text: '设计 POMDP 强化学习策略网络——MLP 架构、16 个离散宏动作、ε-greedy 自适应调度，结合 FAISS 长短期记忆系统（短期缓冲 + 长期索引 + 时间衰减）驱动候选物品动态检索。',
      },
      {
        label: '轻量嵌入',
        text: '提出基于共现矩阵的轻量 Item Embedding：CPU 上约 1 秒即可构建 128 维稠密向量，无需 GPU 训练，直接解决了策略崩塌。',
      },
      {
        label: '实验设计',
        text: '四阶段实验——P5 基线训练 → 评估 → RL+Memory 对比 → 5 变体消融，系统拆解各组件的实际贡献。',
      },
    ],
    stack: ['T5', 'PyTorch', 'POMDP / RL', 'FAISS', 'Amazon Beauty'],
    outcome: 'RL + Memory 系统 HR@10 达到 2.4%，约为随机基线 0.17% 的 14 倍。',
    link: 'https://github.com/returnSGD/LLMRec_recommendation',
    diagram: 'p5rl',
  },
  {
    id: 'cat',
    title: '《猫语心声》AI 决策控制与语言系统',
    org: '腾讯游戏创作大赛',
    period: '2026.04 — 至今',
    lede:
      '一款以「听懂猫语」为核心设定的模拟经营游戏。我负责猫咪的决策控制与语言生成——难点不在于让它动起来，而在于让它在几百个小时里始终像同一只猫。',
    contributions: [
      {
        label: '策略层',
        text: 'Transformer Encoder 结合 FiLM 性格调制，接收 422 维状态空间输出 15 种宏观意图，经 BC 预训练与 PPO 强化学习训练。',
      },
      {
        label: '行为树层',
        text: '自研轻量行为树引擎（Selector / Sequence / Parallel / Decorator），把意图翻译为安全的原子动作序列，保证可控性。',
      },
      {
        label: '文本层',
        text: '本地部署 DeepSeek-R1-Distill-Qwen-1.5B（Q4_0 量化，约 1GB），按需生成 20–30 字的情感化内心独白，内置缓存与模板库降级机制。',
      },
      {
        label: '一致性与记忆',
        text: '性格过滤器（意图偏置 / 行为参数加权 / 文本关键词禁止）与双层记忆系统（工作记忆 20 条 + 长期记忆 500 条 + 向量语义检索）耦合，保证全链路性格一致与长线情感演化。',
      },
    ],
    stack: ['PyTorch', 'PPO', 'Behavior Tree', 'DeepSeek-R1-Distill', '量化推理'],
    link: 'https://github.com/returnSGD/TGA2026/tree/main/cat_control',
    diagram: 'cat',
  },
]

export const secondaryProjects: Project[] = [
  {
    id: 'claude-md',
    title: 'Claude MD Editor',
    org: '独立开发',
    period: '2026.05',
    lede: '把写作与 AI 辅助合进同一个窗口的桌面端 Markdown 编辑器。',
    contributions: [
      {
        label: '编辑器内核',
        text: 'CodeMirror 6 提供语法高亮、自动补全与多标签页，markdown-it 实时预览，支持 KaTeX 公式与 Mermaid 图表。',
      },
      {
        label: 'AI 对话终端',
        text: '内嵌 xterm.js + node-pty 的 Claude Code 终端，无需切换工具即可在编辑器内完成排版优化与内容生成。',
      },
      {
        label: '工程能力',
        text: '一键导出 HTML / PDF / DOCX / 图片；首次启动向导自动检测 Bun 并引导配置 API Key；专注模式、全局搜索、目录树与明暗主题，支持三平台打包。',
      },
    ],
    stack: ['Electron', 'React', 'TypeScript', 'CodeMirror 6'],
    link: 'https://github.com/returnSGD/claude-md',
    diagram: null,
  },
  {
    id: 'arxiv-mcp',
    title: 'arXiv 个性化检索 MCP 服务',
    org: '接入 DeepSeek',
    period: '2026.04',
    lede: '非英语母语的科研人员检索前沿论文，卡在中英转换与结果相关性上。这个服务把整条链路自动化了。',
    contributions: [
      {
        label: '检索流程',
        text: '接收中文查询后由 DeepSeek 翻译并提取核心学术关键词，经 arXiv API 检索摘要。',
      },
      {
        label: '语义重排',
        text: '服务端用 FlagReranker（bge-reranker-v2-m3）在语义层面重排结果，最终把英文摘要实时翻译为中文返回。',
      },
      {
        label: '工程架构',
        text: 'FastAPI 提供 REST API，fastapi-mcp 挂载为 SSE 端点，可作为 Claude Desktop 等智能体的即插即用工具。',
      },
    ],
    stack: ['FastAPI', 'MCP', 'DeepSeek', 'FlagReranker'],
    outcome: '实现「中文输入 → 优质英文论文（含中文摘要）」的全流程自动化。',
    link: 'https://github.com/returnSGD/arxiv_MCP',
    diagram: null,
  },
  {
    id: 'ai-cs',
    title: '智能对话 AI 客服系统',
    org: '独立开发 · LoRA + RAG',
    period: '2025.03 — 2025.04',
    lede: '面向电商手机咨询场景，用三层架构同时解决知识不准确与多轮上下文断裂两个问题。',
    contributions: [
      {
        label: 'RAG 层',
        text: 'Sentence-Transformers + FAISS 从产品知识库检索相关信息，确保回答有据可依。',
      },
      {
        label: '推理层',
        text: 'DeepSeek 结合检索结果与对话历史生成多个候选回复。',
      },
      {
        label: '排序层',
        text: '以 Chinese-MacBERT-Base 为基座，通过 PEFT 注入 LoRA 适配器（rank=8），在 100 万条电商对话上训练二分类模型，对候选回复做上下文匹配度评分并自动择优。',
      },
    ],
    stack: ['LoRA / PEFT', 'FAISS', 'Sentence-Transformers', 'MacBERT'],
    link: 'https://github.com/returnSGD/AI_customer_service',
    diagram: null,
  },
  {
    id: 'churn',
    title: '玩家流失预警与用户画像平台',
    org: '全国「三创赛」商务大数据分析实战赛',
    period: '2025.03 — 2025.04',
    lede:
      '游戏市场进入存量竞争，预测出谁会流失只是第一步——难的是把一个预测结果变成一次有效的干预。',
    contributions: [
      {
        label: '指标体系',
        text: '从 6 大维度 26 项行为指标出发构建流失预警体系，XGBoost 回归与分类模型预测流失程度。',
      },
      {
        label: '用户分群',
        text: 'PCA 降维配合肘部法则与轮廓系数确定最优 K 值，KMeans 聚类完成画像；对比易流失与不易流失群体，定位关键不满维度。',
      },
      {
        label: '舆情监测',
        text: '基于 4.6 万余条玩家评论，用 BERT 做情感分析与主题挖掘，实现实时舆情监测。',
      },
      {
        label: '运营闭环',
        text: '构建「用户画像—舆情关联」机制，把高价值用户群体与负面舆情动态关联，形成从预警到干预的完整闭环。',
      },
    ],
    stack: ['XGBoost', 'BERT', 'KMeans / PCA', '情感分析'],
    link: 'https://github.com/returnSGD/User_growth_monitoring',
    diagram: null,
  },
  {
    id: 'gamegpt',
    title: 'GameGPT 玩家决策预测',
    org: '数据竞赛 / 工程实践',
    period: '2026.05',
    lede: '从 274GB 原始日志里，用 20 秒的历史预测玩家未来 5 秒的决策。',
    contributions: [
      {
        label: '数据处理',
        text: '流式读取压缩包内日志，解析坐标、伤害、动作等原始字段，提取事件密度、战斗强度、物资交互等 55 维结构化特征。',
      },
      {
        label: '模型集成',
        text: 'XGBoost、随机森林与 GBDT 三种集成算法交叉验证训练，通过软投票融合「交战 / 避战」意图决策与动作分类。',
      },
    ],
    stack: ['XGBoost', 'Random Forest', 'GBDT', '流式处理'],
    outcome: '在 289,201 个样本上验证了集成策略对预测稳定性的提升。',
    diagram: null,
  },
]

/* ── Open source ───────────────────────────────────────── */

export interface Contribution {
  project: string
  stars?: string
  status: '已合并' | '已提交'
  period: string
  summary: string
  points: string[]
  /** Only figures literally stated in the résumé. Absent where none exist. */
  stats?: { value: string; label: string }[]
  links: { label: string; href: string }[]
}

export const contributions: Contribution[] = [
  {
    project: 'LightRAG',
    stars: '36.6K',
    status: '已合并',
    period: '2026.06',
    summary:
      'WebUI 前后端散落着三处几乎相同的 NDJSON 流式解析逻辑，且 Token 刷新重试路径会把流读取错误误判为认证失败、误导用户。',
    points: [
      '前端统一 NDJSON 流读取器，消除三处重复的 reader.read() + buffer 分割 + JSON.parse 循环；新增集中式错误分类器统一用户提示；后端提取流生成器工厂函数。',
      '新增 973 行测试（前端 TypeScript 515 行 + 后端 Python 458 行），覆盖正常解析、错误转发、多字节跨块分割、截断 JSON 与 HTTP 错误码等边界场景。',
      '删除冗余代码 290 行，通过 TypeScript、ESLint、Pytest 全量检查后合并至主分支。',
    ],
    stats: [
      { value: '+973', label: '新增测试行' },
      { value: '−290', label: '删除冗余行' },
      { value: '零', label: '回归' },
    ],
    links: [{ label: 'PR #3269', href: 'https://github.com/HKUDS/LightRAG/pull/3269' }],
  },
  {
    project: 'TensorTrade',
    stars: '6.3K',
    status: '已提交',
    period: '2026.06',
    summary:
      '量化交易强化学习框架社区长期缺失做空功能（Issue #439）。采用最小侵入式设计直接扩展现有 OMS 组件，完全向后兼容。',
    points: [
      'TradeSide 枚举新增 SHORT / COVER；Wallet 新增 borrowing 参数允许负余额以自然表达空头持仓；Quantity 放开负值限制；补齐短仓—平仓完整生命周期执行函数。',
      'BSH 新增 allow_short 参数扩展为 Discrete(3)，SimpleOrders 与 ManagedRiskOrders 支持自定义交易方向列表。',
      '新增 23 个专项测试覆盖完整做空—平仓生命周期及风控出场方向；原有 120 个 OMS 单测全部通过、零回归；改动 14 个文件，净增 1,161 行。',
    ],
    stats: [
      { value: '+1,161', label: '净增行 / 14 文件' },
      { value: '23', label: '新增专项测试' },
      { value: '120', label: '原有单测全通过' },
    ],
    links: [
      { label: 'PR #499', href: 'https://github.com/tensortrade-org/tensortrade/pull/499' },
    ],
  },
  {
    project: 'AI_HR_Project',
    status: '已合并',
    period: '2026.06',
    summary: '为开源招聘系统设计并实现 HR 端的批量简历筛选模块。',
    points: [
      '构建「硬性条件筛选 → LLM 多维评分 → 智能排序」三阶段候选人推荐流程，新增 Batch Match API 与前端管理页面，支持批量简历上传、岗位需求配置与候选人排名展示。',
      '完成 Anthropic Messages API 接入与调用链路统一；修复批量筛选页面因全局样式污染导致的布局问题，设计招聘者 / 求职者双入口分流方案。',
    ],
    links: [{ label: 'PR #3', href: 'https://github.com/Begapunk/AI_HR_project/pull/3' }],
  },
  {
    project: 'n8n / WeMD',
    stars: '193K',
    status: '已合并',
    period: '2026.06',
    summary: '两次回归性问题的定位与最小修复。',
    points: [
      'n8n：v2.24.0 的回归导致旧版 Form Trigger 节点缺少 authentication 默认值而崩溃，为 getNodeParameter 调用补充默认值 "none"。',
      'WeMD：表格渲染器硬编码的 font-size 覆盖了主题 CSS 字号，移除硬编码改为交由主题控制。',
    ],
    links: [
      { label: 'n8n PR #32629', href: 'https://github.com/n8n-io/n8n/pull/32629' },
      { label: 'WeMD PR #82', href: 'https://github.com/tenngoxars/WeMD/pull/82' },
    ],
  },
]

/* ── Research interests ────────────────────────────────── */

export interface Interest {
  index: string
  title: string
  titleEn: string
  build: string
  study: string
  care: string
}

export const interests: Interest[] = [
  {
    index: '01',
    title: '推荐系统与序列建模',
    titleEn: 'Recommendation & Sequence Modeling',
    build: '统一 Transformer 架构，把序列建模与特征交互合并为单阶段端到端处理。',
    study: 'OneTrans / MixFormer 一类的统一推荐范式，以及 P5 的 Pretrain-Prompt-Predict 路线。',
    care: '长序列的计算复杂度与语义保真，能不能同时成立。',
  },
  {
    index: '02',
    title: '决策智能：强化学习与记忆',
    titleEn: 'Decision Making under Partial Observability',
    build: 'POMDP 策略网络配合 FAISS 长短期记忆，驱动推荐候选的动态检索。',
    study: '策略崩塌的成因、离散宏动作空间的设计，以及记忆的时间衰减机制。',
    care: '当观测不完整时，记忆究竟能替代多少缺失的信息。',
  },
  {
    index: '03',
    title: 'LLM Agent：评测与安全',
    titleEn: 'Agent Evaluation & Safety',
    build: '聚合主流 Agent 评测数据集，编写可配置的测评脚本并产出评估结果。',
    study: '提示注入、记忆投毒、后门攻击与表征转向等攻防技术路线。',
    care: 'Agent 的能力边界如何被诚实地度量，而不是被 benchmark 过拟合。',
  },
  {
    index: '04',
    title: '用户增长与行为数据',
    titleEn: 'User Growth & Behavioral Data',
    build: '从行为指标到流失预警、用户分群，再到舆情关联的完整闭环。',
    study: '用户分层、生命周期建模与情感分析在运营侧的落地方式。',
    care: '一个预测结果，如何真正变成一次有效的干预。',
  },
]

/* ── Stack ─────────────────────────────────────────────── */

export const stack = [
  { label: 'LANGUAGES', title: '编程语言', items: ['Python', 'TypeScript', 'C / C++', 'SQL'] },
  {
    label: 'MACHINE LEARNING',
    title: '机器学习 / 深度学习',
    items: [
      'PyTorch',
      'Transformers',
      'XGBoost',
      'scikit-learn',
      'BERT',
      'LoRA 微调',
      'PCA / KMeans',
    ],
  },
  {
    label: 'LLM & AGENT',
    title: '大模型与 Agent',
    items: ['LLM 应用', 'RAG', 'MCP', 'Claude Code', '工具调用', 'Agent Runtime', 'Prompt 工程'],
  },
  {
    label: 'ALGORITHMS',
    title: '算法方向',
    items: ['推荐系统', '序列建模', '强化学习 (PPO / POMDP)', '情感分析'],
  },
  {
    label: 'SYSTEMS',
    title: '工程工具',
    items: ['Git / GitHub', 'FastAPI', 'Electron + React', 'Linux', 'Docker'],
  },
  {
    label: 'COLLABORATION',
    title: '开源协作',
    items: ['PR Review', 'Issue Triage', '测试与文档沉淀', '零回归交付'],
  },
] as const

/* ── Awards (intentionally understated) ────────────────── */

export const awards = [
  {
    year: '2026.02',
    title: '美国大学生数学建模竞赛 MCM/ICM',
    detail:
      '构造 Gamma 分布先验的贝叶斯层次模型配合 MCMC 后验推断，提取静态 / 动态特征估计不可观测潜变量；以 R-hat 收敛诊断与 Bootstrap 重采样验证鲁棒性。',
  },
  {
    year: '2025.09',
    title: '高教社杯全国大学生数学建模竞赛',
    detail:
      '多维特征工程 → 改进 IRODDPSO 算法 → 医学约束 K-means 优化分组 → 蒙特卡洛模拟误差分析。',
  },
  {
    year: '2025.09',
    title: '全国高校计算机能力挑战赛 · 大数据挑战赛',
    detail: '在花卉识别任务上实践 Transformer 与 CNN 的深度学习应用。',
  },
  {
    year: '2025.05',
    title: '蓝桥杯全国软件和信息技术专业人才大赛 C/C++ 赛道',
    detail: '省级二等奖。',
  },
] as const

/* ── Navigation ────────────────────────────────────────── */

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'open-source', label: 'Open Source' },
  { id: 'research', label: 'Research' },
  { id: 'contact', label: 'Contact' },
] as const
