/**
 * Single source of truth for every piece of content on the site, in two languages.
 * Everything here traces back to the résumé — nothing is invented.
 * Star counts and PR states are as stated in the résumé (see STAR_DATA_ASOF).
 *
 * `en` is the default language. In English the name is shown Western-order
 * (given name first, surname last) — see `profile.name` / `profile.nameLatin`.
 */

export type Lang = 'en' | 'zh'

export const STAR_DATA_ASOF = '2026.08'

/* ── Shared types ───────────────────────────────────────── */

export interface TimelineItem {
  year: string
  period: string
  org: string
  role: string
  detail: string[]
  keywords: string[]
}

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

export interface Contribution {
  project: string
  stars?: string
  status: string
  /** Whether the PR has been merged (drives the "merged" badge styling). */
  merged: boolean
  period: string
  summary: string
  points: string[]
  /** Only figures literally stated in the résumé. Absent where none exist. */
  stats?: { value: string; label: string }[]
  links: { label: string; href: string }[]
}

export interface Interest {
  index: string
  title: string
  /** Small uppercase subtitle. Empty in English (the title is already English). */
  titleEn: string
  build: string
  study: string
  care: string
}

export interface StackGroup {
  label: string
  title: string
  items: string[]
}

export interface Award {
  year: string
  title: string
  detail: string
}

export interface NavItem {
  id: string
  label: string
}

/* ── Architecture-diagram strings ──────────────────────── */

export interface UnifiedDiagram {
  aria: string
  inputs: string[]
  hetero: string
  unify: string
  unifySub: string
  transformerNote: string
  e2e: string
  e2eSub: string
  kv: string
  mixedParam: string
}

export interface P5RLDiagram {
  aria: string
  main: string
  behaviorSeq: string
  p5: string
  p5Sub: string
  candidates: string
  topk: string
  random: string
  replaceBeam: string
  policy: string
  policySub: string
  drive: string
  memory: string
  memorySub: string
  embed: string
  embedSub: string
  stages: string
}

export interface CatDiagram {
  aria: string
  policy: string
  bt: string
  text: string
  state: string
  tfFilm: string
  tfFilmSub: string
  intents: string
  btEngine: string
  atomic: string
  atomicSub: string
  llm: string
  llmSub: string
  monologue: string
  monologueSub: string
  personality: string
  memory: string
}

export interface Ui {
  skipToContent: string
  navAriaLabel: string
  menu: string
  close: string
  heroSub: string
  contactHeading: [string, string]
  contactIntro: string
  loading: string
  copy: string
  copied: string
  footerNote: string
  openSourceIntro: string
  starAsOf: string
  researchIntro: string
  researchRows: { build: string; study: string; care: string }
  swipeHint: string
  headings: {
    about: string
    experience: string
    projects: string
    openSource: string
    research: string
    stack: string
  }
  systemNodes: [string, string, string, string]
  systemAria: string
}

export interface Content {
  profile: {
    name: string
    nameLatin: string
    focus: string[]
    thesis: string
    github: string
    githubHandle: string
  }
  about: { meta: string[]; paragraphs: string[] }
  timeline: TimelineItem[]
  featuredProjects: Project[]
  secondaryProjects: Project[]
  contributions: Contribution[]
  interests: Interest[]
  stack: StackGroup[]
  awards: Award[]
  navItems: NavItem[]
  ui: Ui
  diagrams: { unified: UnifiedDiagram; p5rl: P5RLDiagram; cat: CatDiagram }
}

/** Split so naive scrapers can't lift it from the static HTML. */
export const emailParts = { user: '2208499028', domain: 'qq.com' } as const
export const email = () => `${emailParts.user}@${emailParts.domain}`

/* ── English (default) ─────────────────────────────────── */

export const en: Content = {
  profile: {
    name: 'Zheng Xu',
    nameLatin: 'Zheng Xu',
    focus: ['Recommender Systems', 'Reinforcement Learning', 'LLM Agents'],
    thesis:
      'I care about how intelligent systems make better decisions when information is limited.',
    github: 'https://github.com/returnSGD',
    githubHandle: 'returnSGD',
  },

  about: {
    meta: [
      'University of Jinan · Data Science & Big Data Technology',
      'Institute of Automation, Chinese Academy of Sciences · In progress',
    ],
    paragraphs: [
      'I study Data Science & Big Data Technology at the University of Jinan. For the past two years I have carried the same question into every project: when observations are incomplete, feedback is delayed and compute is limited, how does a system make good-enough decisions. It can be the trade-offs a recommender system makes under sparse behavior sequences, the policy a reinforcement-learning agent chooses in a partially observable environment, or how an agent corrects itself after a tool call fails.',
      'I am currently working in the lab of Prof. Wu Shu at the Institute of Automation, Chinese Academy of Sciences, on two research threads — LLM agent safety and AI-assisted academic peer review: aggregating mainstream agent evaluation datasets and writing configurable evaluation scripts, and closely reading 24 top-conference papers, extracting each one\'s dataset and baseline, then independently verifying the real structure and release status of 14 of the public datasets. I also proposed my own research direction — for reviewers whose expertise is misaligned with a paper\'s topic, detecting their capability gaps and generating a profile-driven, domain-context remedial package.',
      'I also spend a lot of time in other people\'s codebases. I have submitted and merged PRs to LightRAG, n8n, TensorTrade and others, with a habit of writing tests before touching implementation and shipping with zero regressions. More than writing more code, I care about deleting the redundant part — in the LightRAG refactor, I added 973 lines of tests while removing 290 lines of duplicated logic.',
    ],
  },

  timeline: [
    {
      year: '2026',
      period: '2026.09 — Present',
      org: 'Beijing Caiduodui Information Technology Co., Ltd. (TTC)',
      role: 'Functional Support Center - HR Department - Headquarters HR · Agent Productivity Tool Development Intern',
      detail: [
        'Built a single-seal document stamping agent on the Feishu ecosystem: a colleague raises a request in Feishu, the agent parses document type / employee ID / seal, Feishu HR pulls the data by employee ID, Fadada applies the e-seal, and the sealed file plus a ledger entry land back in a Feishu Bitable — the whole loop closed inside Feishu. "Preview-confirm + SHA-256 hash locking" and idempotent de-duplication turn irreversible stamping into an auditable act.',
        'A role-based HR/finance query system: sensitive payroll data lives in a Feishu Bitable, where a native Bitable agent plus advanced permissions (row-level + column-level) places the security boundary at the data-source layer — the agent inherits permissions by the logged-in user\'s identity, so an employee sees only their own row while HR/finance can maintain everything, rather than relying on prompt-level filtering.',
      ],
      keywords: ['Feishu Open Platform', 'LLM Agent', 'E-signature', 'Row/Column-level Permissions', 'Idempotency & Audit'],
    },
    {
      year: '2026',
      period: '2026.07 — Present',
      org: 'Institute of Automation, Chinese Academy of Sciences',
      role: 'Prof. Wu Shu\'s group · Research intern',
      detail: [
        'Independently responsible for literature review, benchmark evaluation and research-direction exploration, participating fully in group meetings and the entire research process. Systematically mapped the attack and defense landscape for LLM agents, including prompt injection, memory poisoning, backdoor attacks and representation steering.',
      ],
      keywords: ['LLM Agent Safety', 'Benchmark Evaluation', 'AI-assisted Peer Review', 'Knowledge Graph'],
    },
    {
      year: '2025',
      period: '2025.05 — Present',
      org: 'LLM-Augmented Recommender Systems',
      role: 'Independent research',
      detail: [
        'Reproduced the P5 (Pretrain-Prompt-Predict) framework, and in response to Beam Search\'s inefficiency and tendency toward policy collapse, designed a hybrid recommendation architecture combining POMDP reinforcement learning with memory augmentation, validated component-by-component through a four-stage experiment.',
      ],
      keywords: ['P5', 'POMDP', 'FAISS Memory', 'Ablation Study'],
    },
    {
      year: '2024',
      period: '2024.09 — 2028.06',
      org: 'University of Jinan',
      role: 'Data Science & Big Data Technology · Undergraduate',
      detail: [
        'Outside of coursework, most of my time goes to recommendation algorithms, reinforcement learning and LLM applications. Mathematical modeling and algorithm competitions built my foundation in statistical modeling and engineering implementation.',
      ],
      keywords: ['Data Science', 'Statistical Modeling', 'Algorithm Competitions'],
    },
  ],

  featuredProjects: [
    {
      id: 'unified-rec',
      title: 'Unified Recommender System',
      org: 'Tencent Advertising Algorithm Competition × KDD Cup',
      period: '2026.03 — 2026.05',
      lede:
        'In large-scale recommendation, sequence modeling and feature interaction have long been split into two stages, causing information loss and redundant computation. This project merges the two into an end-to-end single-stage architecture with a unified Transformer.',
      contributions: [
        {
          label: 'Unified tokenization',
          text: 'Maps heterogeneous features — user behavior sequences and item attributes — into the same semantic space, so cross-feature interaction can happen at the same layer depth.',
        },
        {
          label: 'Hybrid parameterization',
          text: 'Sequence tokens share parameters for efficiency; non-sequence tokens keep independent parameters to preserve semantic distinction.',
        },
        {
          label: 'Pyramid stacking',
          text: 'Layer-by-layer pruning combined with KV-cache reuse lowers self-attention complexity from O(L²) to O(L).',
        },
      ],
      stack: ['PyTorch', 'Transformer', 'KV Cache', 'OneTrans / MixFormer'],
      outcome:
        'Validated the architecture on million-scale interaction data, offering a viable end-to-end solution for large-scale industrial recommendation.',
      diagram: 'unified',
    },
    {
      id: 'llm-rec',
      title: 'LLM-Augmented Recommender System',
      org: 'Independent research · P5 + Reinforcement Learning + Memory architecture',
      period: '2025.05 — Present',
      lede:
        'After reproducing the P5 generative recommendation framework, I found Beam Search is both slow and prone to policy collapse. So I handed candidate retrieval to a policy network learned in a partially observable environment, and paired it with a long/short-term memory system.',
      contributions: [
        {
          label: 'Baseline reproduction',
          text: 'Reproduced the P5 framework on a T5 backbone and ran sequence-recommendation experiments on Amazon Beauty (22,363 users / 12,101 items / 5-core filtering).',
        },
        {
          label: 'Policy network',
          text: 'Designed a POMDP reinforcement-learning policy network — MLP architecture, 16 discrete macro-actions, adaptive ε-greedy scheduling — combined with a FAISS long/short-term memory system (short-term buffer + long-term index + time decay) to drive dynamic candidate retrieval.',
        },
        {
          label: 'Lightweight embedding',
          text: 'Proposed a co-occurrence-matrix-based lightweight item embedding: about 1 second on CPU to build a 128-dim dense vector with no GPU training, directly solving policy collapse.',
        },
        {
          label: 'Experiment design',
          text: 'A four-stage experiment — P5 baseline training → evaluation → RL+Memory comparison → 5-variant ablation — systematically dissects each component\'s contribution.',
        },
      ],
      stack: ['T5', 'PyTorch', 'POMDP / RL', 'FAISS', 'Amazon Beauty'],
      outcome: 'The RL + Memory system reached 2.4% HR@10 — about 14× the 0.17% random baseline.',
      link: 'https://github.com/returnSGD/LLMRec_recommendation',
      diagram: 'p5rl',
    },
    {
      id: 'cat',
      title: 'Cat Language: AI Decision Control & Language System',
      org: 'Tencent Game Creation Competition',
      period: '2026.04 — Present',
      lede:
        'A simulation-management game built around "understanding cat language". I own the cats\' decision control and language generation — the hard part is not making it move, but making it feel like the same cat across hundreds of hours.',
      contributions: [
        {
          label: 'Policy layer',
          text: 'A Transformer encoder with FiLM personality modulation takes a 422-dim state space and outputs 15 macro-intents, trained with BC pretraining and PPO reinforcement learning.',
        },
        {
          label: 'Behavior-tree layer',
          text: 'A self-built lightweight behavior-tree engine (Selector / Sequence / Parallel / Decorator) translates intent into safe atomic action sequences, guaranteeing controllability.',
        },
        {
          label: 'Text layer',
          text: 'A locally deployed DeepSeek-R1-Distill-Qwen-1.5B (Q4_0 quantized, ~1GB) generates 20–30 character emotional inner monologue on demand, with built-in cache and template fallback.',
        },
        {
          label: 'Consistency & memory',
          text: 'A personality filter (intent bias / behavior-parameter weighting / text keyword blocking) coupled with a two-tier memory system (20 working memory + 500 long-term memory + vector semantic retrieval) guarantees end-to-end personality consistency and long-term emotional evolution.',
        },
      ],
      stack: ['PyTorch', 'PPO', 'Behavior Tree', 'DeepSeek-R1-Distill', 'Quantized Inference'],
      link: 'https://github.com/returnSGD/TGA2026/tree/main/cat_control',
      diagram: 'cat',
    },
  ],

  secondaryProjects: [
    {
      id: 'claude-md',
      title: 'Claude MD Editor',
      org: 'Independent project',
      period: '2026.05',
      lede: 'A desktop Markdown editor that puts writing and AI assistance in the same window.',
      contributions: [
        {
          label: 'Editor core',
          text: 'CodeMirror 6 for syntax highlighting, autocomplete and multi-tab; markdown-it for live preview, with KaTeX formulas and Mermaid diagrams.',
        },
        {
          label: 'AI terminal',
          text: 'An embedded Claude Code terminal (xterm.js + node-pty) lets you polish formatting and generate content without leaving the editor.',
        },
        {
          label: 'Engineering',
          text: 'One-click export to HTML / PDF / DOCX / images; a first-run wizard auto-detects Bun and walks through API-key setup; focus mode, global search, a file tree and light/dark themes, packaged for all three platforms.',
        },
      ],
      stack: ['Electron', 'React', 'TypeScript', 'CodeMirror 6'],
      link: 'https://github.com/returnSGD/claude-md',
      diagram: null,
    },
    {
      id: 'arxiv-mcp',
      title: 'arXiv Personalized Retrieval MCP Service',
      org: 'Powered by DeepSeek',
      period: '2026.04',
      lede:
        'Non-native-English researchers hunting for frontier papers get stuck on Chinese↔English conversion and result relevance. This service automates the whole pipeline.',
      contributions: [
        {
          label: 'Retrieval flow',
          text: 'Takes a Chinese query, has DeepSeek translate it and extract core academic keywords, then searches abstracts via the arXiv API.',
        },
        {
          label: 'Semantic reranking',
          text: 'The server reranks results at the semantic level with FlagReranker (bge-reranker-v2-m3), then translates English abstracts back to Chinese in real time.',
        },
        {
          label: 'Architecture',
          text: 'FastAPI provides the REST API; fastapi-mcp mounts it as an SSE endpoint, usable as a plug-and-play tool for agents like Claude Desktop.',
        },
      ],
      stack: ['FastAPI', 'MCP', 'DeepSeek', 'FlagReranker'],
      outcome: 'Automates the full "Chinese input → quality English papers (with Chinese abstracts)" flow.',
      link: 'https://github.com/returnSGD/arxiv_MCP',
      diagram: null,
    },
    {
      id: 'ai-cs',
      title: 'Intelligent Conversational Customer-Service System',
      org: 'Independent project · LoRA + RAG',
      period: '2025.03 — 2025.04',
      lede:
        'For e-commerce phone-consultation scenarios, a three-layer architecture solves both knowledge inaccuracy and multi-turn context loss at once.',
      contributions: [
        {
          label: 'RAG layer',
          text: 'Sentence-Transformers + FAISS retrieve relevant information from a product knowledge base, so every answer is grounded.',
        },
        {
          label: 'Reasoning layer',
          text: 'DeepSeek combines retrieved results with dialogue history to generate multiple candidate replies.',
        },
        {
          label: 'Ranking layer',
          text: 'A binary classifier fine-tuned from Chinese-MacBERT-Base via a LoRA adapter (rank=8) on one million e-commerce conversations scores candidates for context match and auto-picks the best.',
        },
      ],
      stack: ['LoRA / PEFT', 'FAISS', 'Sentence-Transformers', 'MacBERT'],
      link: 'https://github.com/returnSGD/AI_customer_service',
      diagram: null,
    },
    {
      id: 'churn',
      title: 'Player Churn Prediction & User Profiling Platform',
      org: 'National "Three Creativity" Competition · Business Big-Data Analysis',
      period: '2025.03 — 2025.04',
      lede:
        'The gaming market has entered zero-sum competition, and predicting who will churn is only the first step — the hard part is turning a prediction into an effective intervention.',
      contributions: [
        {
          label: 'Metric system',
          text: 'Built a churn-warning system on 26 behavioral metrics across 6 dimensions; XGBoost regression and classification models predict churn severity.',
        },
        {
          label: 'User segmentation',
          text: 'PCA dimensionality reduction plus the elbow method and silhouette score determine the optimal K; KMeans clustering completes profiling, comparing churn-prone vs. loyal groups to locate the key dissatisfaction dimensions.',
        },
        {
          label: 'Sentiment monitoring',
          text: 'BERT sentiment analysis and topic mining over 46,000+ player reviews enable real-time public-opinion monitoring.',
        },
        {
          label: 'Closed-loop operation',
          text: 'A "user profiling — sentiment correlation" mechanism links high-value user groups with negative sentiment, forming a complete warning-to-intervention loop.',
        },
      ],
      stack: ['XGBoost', 'BERT', 'KMeans / PCA', 'Sentiment Analysis'],
      link: 'https://github.com/returnSGD/User_growth_monitoring',
      diagram: null,
    },
    {
      id: 'gamegpt',
      title: 'GameGPT Player Decision Prediction',
      org: 'Data competition / engineering practice',
      period: '2026.05',
      lede: 'From 274GB of raw logs, predict a player\'s decision in the next 5 seconds using 20 seconds of history.',
      contributions: [
        {
          label: 'Data processing',
          text: 'Stream-reads compressed logs, parses coordinates, damage, actions and other raw fields, and extracts 55 structured features such as event density, combat intensity and item interaction.',
        },
        {
          label: 'Model ensembling',
          text: 'XGBoost, random forest and GBDT trained with cross-validation, soft-voting to fuse the "engage / avoid" intent decision with action classification.',
        },
      ],
      stack: ['XGBoost', 'Random Forest', 'GBDT', 'Stream Processing'],
      outcome: 'Validated the ensembling strategy\'s contribution to prediction stability on 289,201 samples.',
      diagram: null,
    },
  ],

  contributions: [
    {
      project: 'LightRAG',
      stars: '36.6K',
      status: 'Merged',
      merged: true,
      period: '2026.06',
      summary:
        'The WebUI front and back ends scattered three nearly identical NDJSON streaming parsers, and the token-refresh retry path misreported stream-read errors as authentication failures, misleading users.',
      points: [
        'Unified the frontend NDJSON stream reader, eliminating three duplicated reader.read() + buffer-split + JSON.parse loops; added a centralized error classifier for consistent user messages; extracted a stream-generator factory in the backend.',
        'Added 973 lines of tests (515 TypeScript frontend + 458 Python backend) covering normal parsing, error forwarding, multi-byte chunk splitting, truncated JSON and HTTP error codes.',
        'Removed 290 lines of redundant code, merged to main after passing TypeScript, ESLint and Pytest in full.',
      ],
      stats: [
        { value: '+973', label: 'test lines added' },
        { value: '−290', label: 'redundant lines removed' },
        { value: 'Zero', label: 'regressions' },
      ],
      links: [{ label: 'PR #3269', href: 'https://github.com/HKUDS/LightRAG/pull/3269' }],
    },
    {
      project: 'TensorTrade',
      stars: '6.3K',
      status: 'Submitted',
      merged: false,
      period: '2026.06',
      summary:
        'The quantitative-trading RL framework community has long lacked short-selling (Issue #439). I adopted a minimally invasive design that directly extends the existing OMS components, fully backward-compatible.',
      points: [
        'Added SHORT / COVER to the TradeSide enum; added a borrowing parameter to Wallet to allow negative balances, naturally expressing short positions; removed the negative-value restriction on Quantity; completed the full short-cover lifecycle execution functions.',
        'Extended BSH with an allow_short parameter to Discrete(3); SimpleOrders and ManagedRiskOrders now support custom trade-direction lists.',
        'Added 23 targeted tests covering the full short-cover lifecycle and risk-control exit direction; all 120 existing OMS unit tests pass with zero regressions; 14 files changed, net +1,161 lines.',
      ],
      stats: [
        { value: '+1,161', label: 'net lines / 14 files' },
        { value: '23', label: 'new targeted tests' },
        { value: '120', label: 'existing tests all pass' },
      ],
      links: [
        { label: 'PR #499', href: 'https://github.com/tensortrade-org/tensortrade/pull/499' },
      ],
    },
    {
      project: 'AI_HR_Project',
      status: 'Merged',
      merged: true,
      period: '2026.06',
      summary: 'Designed and implemented the HR-side batch resume-screening module for an open-source recruiting system.',
      points: [
        'Built a three-stage candidate recommendation flow — hard-condition filtering → LLM multi-dimensional scoring → smart ranking — with a new Batch Match API and a frontend admin page supporting batch resume upload, job-requirement configuration and candidate ranking display.',
        'Integrated the Anthropic Messages API and unified the call path; fixed the batch-screening page layout broken by global style pollution; designed a recruiter / job-seeker dual-entry routing scheme.',
      ],
      links: [{ label: 'PR #3', href: 'https://github.com/Begapunk/AI_HR_project/pull/3' }],
    },
    {
      project: 'n8n / WeMD',
      stars: '193K',
      status: 'Merged',
      merged: true,
      period: '2026.06',
      summary: 'Two regression diagnoses and minimal fixes.',
      points: [
        'n8n: a regression in v2.24.0 caused the old Form Trigger node to crash for missing the authentication default — added the default value "none" to the getNodeParameter call.',
        'WeMD: the table renderer\'s hard-coded font-size overrode the theme CSS; removed the hard-coding and returned it to theme control.',
      ],
      links: [
        { label: 'n8n PR #32629', href: 'https://github.com/n8n-io/n8n/pull/32629' },
        { label: 'WeMD PR #82', href: 'https://github.com/tenngoxars/WeMD/pull/82' },
      ],
    },
  ],

  interests: [
    {
      index: '01',
      title: 'Recommendation & Sequence Modeling',
      titleEn: '',
      build:
        'A unified Transformer architecture that merges sequence modeling and feature interaction into single-stage, end-to-end processing.',
      study: 'Unified recommendation paradigms like OneTrans / MixFormer, and P5\'s Pretrain-Prompt-Predict route.',
      care: 'Whether long-sequence computational complexity and semantic fidelity can hold at the same time.',
    },
    {
      index: '02',
      title: 'Decision Intelligence: Reinforcement Learning & Memory',
      titleEn: '',
      build:
        'A POMDP policy network paired with FAISS long/short-term memory to drive dynamic candidate retrieval for recommendation.',
      study: 'The causes of policy collapse, the design of discrete macro-action spaces, and time-decay mechanisms for memory.',
      care: 'How much missing information memory can actually replace when observations are incomplete.',
    },
    {
      index: '03',
      title: 'LLM Agents: Evaluation & Safety',
      titleEn: '',
      build:
        'Aggregating mainstream agent evaluation datasets and writing configurable evaluation scripts to produce assessment results.',
      study: 'Attack and defense techniques — prompt injection, memory poisoning, backdoor attacks and representation steering.',
      care: 'How an agent\'s capability boundaries can be measured honestly, rather than overfit to a benchmark.',
    },
    {
      index: '04',
      title: 'User Growth & Behavioral Data',
      titleEn: '',
      build:
        'A complete loop from behavioral metrics to churn warning, user segmentation, and sentiment correlation.',
      study: 'How user stratification, lifecycle modeling and sentiment analysis land in operations.',
      care: 'How a prediction actually becomes an effective intervention.',
    },
  ],

  stack: [
    { label: 'LANGUAGES', title: 'Programming Languages', items: ['Python', 'TypeScript', 'C / C++', 'SQL'] },
    {
      label: 'MACHINE LEARNING',
      title: 'Machine Learning / Deep Learning',
      items: ['PyTorch', 'Transformers', 'XGBoost', 'scikit-learn', 'BERT', 'LoRA Fine-tuning', 'PCA / KMeans'],
    },
    {
      label: 'LLM & AGENT',
      title: 'LLM & Agents',
      items: ['LLM Applications', 'RAG', 'MCP', 'Claude Code', 'Tool Calling', 'Agent Runtime', 'Prompt Engineering'],
    },
    {
      label: 'ALGORITHMS',
      title: 'Algorithm Directions',
      items: ['Recommender Systems', 'Sequence Modeling', 'Reinforcement Learning (PPO / POMDP)', 'Sentiment Analysis'],
    },
    {
      label: 'SYSTEMS',
      title: 'Engineering Tools',
      items: ['Git / GitHub', 'FastAPI', 'Electron + React', 'Linux', 'Docker'],
    },
    {
      label: 'COLLABORATION',
      title: 'Open-source Collaboration',
      items: ['PR Review', 'Issue Triage', 'Testing & Documentation', 'Zero-regression Delivery'],
    },
  ],

  awards: [
    {
      year: '2026.02',
      title: 'Interdisciplinary Contest in Modeling (MCM/ICM)',
      detail:
        'Constructed a Bayesian hierarchical model with a Gamma-distribution prior and MCMC posterior inference, extracting static/dynamic features to estimate unobservable latent variables; validated robustness with R-hat convergence diagnostics and bootstrap resampling.',
    },
    {
      year: '2025.09',
      title: 'China Undergraduate Mathematical Contest in Modeling (CUMCM)',
      detail:
        'Multi-dimensional feature engineering → improved IRODDPSO algorithm → medically constrained K-means optimized grouping → Monte Carlo simulation error analysis.',
    },
    {
      year: '2025.09',
      title: 'National College Computer Ability Challenge · Big Data Challenge',
      detail: 'Practiced deep-learning applications of Transformer and CNN on a flower-recognition task.',
    },
    {
      year: '2025.05',
      title: 'Blue Bridge Cup National Software and IT Talent Competition (C/C++ Track)',
      detail: 'Provincial second prize.',
    },
  ],

  navItems: [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'open-source', label: 'Open Source' },
    { id: 'research', label: 'Research' },
    { id: 'contact', label: 'Contact' },
  ],

  ui: {
    skipToContent: 'Skip to content',
    navAriaLabel: 'Main navigation',
    menu: 'Menu',
    close: 'Close',
    heroSub:
      'Currently researching at the Institute of Automation, Chinese Academy of Sciences, on the evaluation and safety of LLM agents; outside of coursework, most of my time goes to recommendation algorithms and open source.',
    contactHeading: ['Let\'s build', 'something interesting.'],
    contactIntro:
      'If you\'re working on recommender systems, reinforcement learning or agents, feel free to reach out — whether it\'s an internship, open-source collaboration, or just wanting to discuss a paper.',
    loading: 'Loading…',
    copy: 'Copy',
    copied: 'Copied',
    footerNote: 'All content is drawn from my own résumé, without exaggeration.',
    openSourceIntro:
      'More than writing more code, I care about deleting the redundant part. Every entry below links to the original PR for verification.',
    starAsOf: 'Star counts as of {date}.',
    researchIntro:
      'Rather than listing skills, let me be concrete: what I\'m building, what I\'m studying, and the question I actually care about.',
    researchRows: { build: 'Building', study: 'Studying', care: 'Care about' },
    swipeHint: 'Scroll to view',
    headings: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      openSource: 'Open Source',
      research: 'Research Interests',
      stack: 'Stack',
    },
    systemNodes: ['Data', 'Model', 'Agent', 'System'],
    systemAria:
      'System diagram: data flows to models, models drive agents, agents compose systems, and systems produce new data.',
  },

  diagrams: {
    unified: {
      aria: 'Unified recommendation architecture diagram',
      inputs: ['User behavior sequence', 'Item attributes', 'Context features'],
      hetero: 'Heterogeneous features',
      unify: 'Unified tokenization',
      unifySub: 'Shared semantic space',
      transformerNote: 'Unified Transformer · Pyramid stacking (layer-wise pruning)',
      e2e: 'End-to-end output',
      e2eSub: 'Single-stage',
      kv: 'KV cache reuse',
      mixedParam:
        'Hybrid parameterization: sequence tokens share parameters for efficiency, non-sequence tokens keep independent parameters to preserve semantics',
    },
    p5rl: {
      aria: 'P5 with reinforcement learning and memory architecture diagram',
      main: 'Main pipeline',
      behaviorSeq: 'User behavior sequence',
      p5: 'P5 framework',
      p5Sub: 'T5 backbone · Prompt',
      candidates: 'Candidate item set',
      topk: 'Top-K recommendation',
      random: 'Random baseline  0.17%',
      replaceBeam: 'Replaces Beam Search',
      policy: 'POMDP policy network',
      policySub: 'MLP · 16 discrete macro-actions · ε-greedy',
      drive: 'Drives dynamic retrieval',
      memory: 'FAISS long/short-term memory',
      memorySub: 'Short-term buffer · Long-term index · Time decay',
      embed: 'Co-occurrence Item Embedding',
      embedSub: '~1s on CPU · 128-dim',
      stages: 'Four-stage experiment: P5 baseline training → evaluation → RL+Memory comparison → 5-variant ablation',
    },
    cat: {
      aria: 'Cat three-layer decision architecture diagram',
      policy: 'Policy layer',
      bt: 'Behavior-tree layer',
      text: 'Text layer',
      state: '422-dim state',
      tfFilm: 'Transformer + FiLM',
      tfFilmSub: 'BC pretraining → PPO',
      intents: '15 macro-intents',
      btEngine: 'Lightweight behavior-tree engine',
      atomic: 'Atomic action sequence',
      atomicSub: 'Controlled execution',
      llm: 'DeepSeek-R1-Distill 1.5B',
      llmSub: 'Q4_0 quantized · ~1GB local',
      monologue: 'Inner monologue 20–30 chars',
      monologueSub: 'Cache + template fallback',
      personality:
        'Across all three layers: personality filter (intent bias / behavior-parameter weighting / text keyword blocking)',
      memory: '× two-tier memory (working 20 · long-term 500 · vector semantic retrieval)',
    },
  },
}

/* ── Chinese ────────────────────────────────────────────── */

export const zh: Content = {
  profile: {
    name: '许政',
    nameLatin: 'Xu Zheng',
    focus: ['推荐系统', '强化学习', 'LLM Agent'],
    thesis: '我关心智能系统如何在信息有限时做出更好的决策。',
    github: 'https://github.com/returnSGD',
    githubHandle: 'returnSGD',
  },

  about: {
    meta: ['济南大学 · 数据科学与大数据技术', '中国科学院自动化研究所 · 在研'],
    paragraphs: [
      '我在济南大学读数据科学与大数据技术。过去两年，我把同一个问题反复带进每一个项目：当观测是不完整的、反馈是延迟的、算力是有限的，一个系统该如何做出足够好的决策。它可以是推荐系统面对稀疏行为序列时的取舍，可以是强化学习智能体在部分可观测环境下的策略选择，也可以是一个 Agent 在工具调用失败之后如何自我修正。',
      '目前在中国科学院自动化研究所吴书研究员课题组，围绕大模型智能体安全与 AI 辅助学术评审两个方向做研究：聚合主流 Agent 评测数据集并编写可配置的测评脚本，精读 24 篇顶会论文、逐篇提取数据集与 Baseline 并联网核验其中 14 个公开数据集的真实结构与发布状态。我也提出了自己的研究方向——面向专业背景与论文主题错位的评审人，检测其能力缺口，生成画像驱动的领域上下文补课包。',
      '我同样把时间花在别人的代码库里。为 LightRAG、n8n、TensorTrade 等项目提交并合并过 PR，习惯是先补测试再动实现，交付时保证零回归。比起写出更多代码，我更在意删掉多余的那部分——在 LightRAG 那次重构里，新增 973 行测试的同时删掉了 290 行重复逻辑。',
    ],
  },

  timeline: [
    {
      year: '2026',
      period: '2026.09 — 至今',
      org: '北京才多对信息技术有限公司（TTC）',
      role: '职能支持中心-人力资源部-总部人力资源 · agent 提效工具开发实习',
      detail: [
        '在飞书生态搭建单章文件自动化盖章 Agent：同事在飞书里发起 → AI 解析类型/工号/印章 → 飞书人事按工号取数 → 法大大电子签章落章 → 盖章件回传、用印台账写入飞书多维表格，全链路在飞书内闭环；以「预览确认 + SHA-256 哈希锁定」与防重幂等，把不可逆的盖章变成可审计动作。',
        '面向不同角色的人事财务查询系统：敏感薪酬数据落在飞书多维表格，用多维表格原生智能体 + 高级权限（行级 + 列级）把安全边界放在数据源层，让智能体按登录用户身份继承权限——员工只看本人、HR/财务维护全部，而非依赖提示词拦截。',
      ],
      keywords: ['飞书开放平台', 'LLM Agent', '电子签章', '行级/列级权限', '幂等与审计'],
    },
    {
      year: '2026',
      period: '2026.07 — 至今',
      org: '中国科学院自动化研究所',
      role: '吴书研究员课题组 · 研究实习',
      detail: [
        '独立承担文献调研、基准评测与研究思路探索，全程参与组会研讨与科研全流程。系统梳理 LLM Agent 的攻击与防御技术路线，包括提示注入、记忆投毒、后门攻击与表征转向。',
      ],
      keywords: ['LLM Agent 安全', 'Benchmark 评测', 'AI 辅助学术评审', '知识图谱'],
    },
    {
      year: '2025',
      period: '2025.05 — 至今',
      org: 'LLM 增强推荐系统研究',
      role: '独立科研',
      detail: [
        '复现 P5（Pretrain-Prompt-Predict）框架，针对 Beam Search 效率低且易产生策略崩塌的问题，设计 POMDP 强化学习结合记忆增强的混合推荐架构，并通过四阶段实验系统验证各组件贡献。',
      ],
      keywords: ['P5', 'POMDP', 'FAISS 记忆', '消融实验'],
    },
    {
      year: '2024',
      period: '2024.09 — 2028.06',
      org: '济南大学',
      role: '数据科学与大数据技术 · 本科',
      detail: [
        '课程之外的时间基本都在推荐算法、强化学习与大模型应用上。数学建模与算法竞赛训练打下了统计建模与工程实现的底子。',
      ],
      keywords: ['数据科学', '统计建模', '算法竞赛'],
    },
  ],

  featuredProjects: [
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
  ],

  secondaryProjects: [
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
  ],

  contributions: [
    {
      project: 'LightRAG',
      stars: '36.6K',
      status: '已合并',
      merged: true,
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
      merged: false,
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
      merged: true,
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
      merged: true,
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
  ],

  interests: [
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
  ],

  stack: [
    { label: 'LANGUAGES', title: '编程语言', items: ['Python', 'TypeScript', 'C / C++', 'SQL'] },
    {
      label: 'MACHINE LEARNING',
      title: '机器学习 / 深度学习',
      items: ['PyTorch', 'Transformers', 'XGBoost', 'scikit-learn', 'BERT', 'LoRA 微调', 'PCA / KMeans'],
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
  ],

  awards: [
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
  ],

  navItems: [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'open-source', label: 'Open Source' },
    { id: 'research', label: 'Research' },
    { id: 'contact', label: 'Contact' },
  ],

  ui: {
    skipToContent: '跳到主要内容',
    navAriaLabel: '主导航',
    menu: '菜单',
    close: '关闭',
    heroSub: '目前在中国科学院自动化研究所做研究，方向是大模型智能体的评测与安全；课余把大量时间花在推荐算法与开源项目上。',
    contactHeading: ['一起做点', '有意思的东西。'],
    contactIntro:
      '如果你在做推荐系统、强化学习或者 Agent 相关的事情，欢迎直接找我聊——无论是实习机会、开源协作，还是单纯想讨论某篇论文。',
    loading: '载入中…',
    copy: '复制',
    copied: '已复制',
    footerNote: '本站内容均来自本人简历，未作夸大。',
    openSourceIntro: '比起写出更多代码，我更在意删掉多余的那部分。下面每一条都可以点开原始 PR 核验。',
    starAsOf: 'Star 数据截至 {date}。',
    researchIntro: '与其罗列技能，不如说清楚：我在做什么、在读什么、以及真正在意哪个问题。',
    researchRows: { build: '在做', study: '在读', care: '在意' },
    swipeHint: '可横向滑动',
    headings: {
      about: '关于',
      experience: '经历',
      projects: '项目',
      openSource: '开源贡献',
      research: '关注的方向',
      stack: '技术栈',
    },
    systemNodes: ['数据', '模型', '智能体', '系统'],
    systemAria: '系统示意图：数据流向模型，模型驱动智能体，智能体构成系统，系统再产生新的数据。',
  },

  diagrams: {
    unified: {
      aria: '统一推荐架构图',
      inputs: ['用户行为序列', '物品属性', '上下文特征'],
      hetero: '异构特征',
      unify: '统一分词',
      unifySub: '同一语义空间',
      transformerNote: '统一 Transformer · 金字塔堆叠（逐层剪枝）',
      e2e: '端到端输出',
      e2eSub: '单阶段',
      kv: 'KV 缓存复用',
      mixedParam: '混合参数化：序列 Token 共享参数以提升效率，非序列 Token 保留独立参数以维持语义',
    },
    p5rl: {
      aria: 'P5 加强化学习与记忆架构图',
      main: '主链路',
      behaviorSeq: '用户行为序列',
      p5: 'P5 框架',
      p5Sub: 'T5 骨干 · Prompt',
      candidates: '候选物品集',
      topk: 'Top-K 推荐',
      random: '随机基线  0.17%',
      replaceBeam: '替代 Beam Search',
      policy: 'POMDP 策略网络',
      policySub: 'MLP · 16 离散宏动作 · ε-greedy',
      drive: '驱动动态检索',
      memory: 'FAISS 长短期记忆',
      memorySub: '短期缓冲 · 长期索引 · 时间衰减',
      embed: '共现矩阵 Item Embedding',
      embedSub: 'CPU 约 1s · 128 维',
      stages: '四阶段实验：P5 基线训练 → 评估 → RL+Memory 对比 → 5 变体消融',
    },
    cat: {
      aria: '猫咪三层决策架构图',
      policy: '策略层',
      bt: '行为树层',
      text: '文本层',
      state: '422 维状态',
      tfFilm: 'Transformer + FiLM',
      tfFilmSub: 'BC 预训练 → PPO',
      intents: '15 种宏观意图',
      btEngine: '轻量行为树引擎',
      atomic: '原子动作序列',
      atomicSub: '可控执行',
      llm: 'DeepSeek-R1-Distill 1.5B',
      llmSub: 'Q4_0 量化 · 本地约 1GB',
      monologue: '内心独白 20–30 字',
      monologueSub: '缓存 + 模板降级',
      personality: '贯穿三层：性格过滤器（意图偏置 / 行为参数加权 / 文本关键词禁止）',
      memory: '× 双层记忆（工作记忆 20 · 长期记忆 500 · 向量语义检索）',
    },
  },
}

export const content: Record<Lang, Content> = { en, zh }
