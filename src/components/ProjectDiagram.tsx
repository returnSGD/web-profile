import type { DiagramKind } from '../data/resume'

/**
 * Architecture diagrams for the three featured projects.
 * Inline SVG, 1px hairlines, one accent path per diagram carrying the key idea.
 * They scale down but never below `minW` — narrow screens scroll them instead
 * of shrinking the labels into illegibility.
 */

const INK = '#181818'
const INK2 = '#6B6B6B'
const INK3 = '#9E9E98'
const LINE = '#D8D8D3'
const ACCENT = '#2B4C86'

export function ProjectDiagram({ kind }: { kind: DiagramKind }) {
  if (!kind) return null
  const map = { unified: <Unified />, p5rl: <P5RL />, cat: <CatSystem /> }
  return (
    <figure className="mt-8 border-t border-line pt-8">
      <figcaption className="label-en flex items-baseline gap-3">
        Architecture
        {/* The diagram out-widths a phone, so say so rather than clipping silently. */}
        <span className="text-[0.625rem] tracking-normal normal-case lg:hidden">可横向滑动</span>
      </figcaption>
      <div className="relative mt-6">
        <div className="-mx-1 overflow-x-auto pb-2">
          <div className="min-w-[620px] px-1">{map[kind]}</div>
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-bg to-transparent lg:hidden"
          aria-hidden="true"
        />
      </div>
    </figure>
  )
}

/* ── Shared primitives ─────────────────────────────────── */

function Box({
  x,
  y,
  w,
  h,
  label,
  sub,
  accent = false,
  fill = 'none',
}: {
  x: number
  y: number
  w: number
  h: number
  label: string
  sub?: string
  accent?: boolean
  fill?: string
}) {
  const stroke = accent ? ACCENT : LINE
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={fill} stroke={stroke} strokeWidth={1} />
      <text
        x={x + w / 2}
        y={sub ? y + h / 2 - 5 : y + h / 2 + 4}
        textAnchor="middle"
        fontSize={11}
        fill={accent ? ACCENT : INK}
      >
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 10} textAnchor="middle" fontSize={9} fill={INK3}>
          {sub}
        </text>
      )}
    </g>
  )
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  accent = false,
  dashed = false,
  both = false,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  accent?: boolean
  dashed?: boolean
  both?: boolean
}) {
  const c = accent ? ACCENT : LINE
  const id = accent ? 'ah-a' : 'ah'
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={c}
      strokeWidth={1}
      strokeDasharray={dashed ? '3 3' : undefined}
      markerEnd={`url(#${id})`}
      markerStart={both ? `url(#${id})` : undefined}
    />
  )
}

function Defs() {
  return (
    <defs>
      {[
        ['ah', LINE],
        ['ah-a', ACCENT],
      ].map(([id, color]) => (
        <marker
          key={id}
          id={id}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0.5 1 L7 4 L0.5 7" fill="none" stroke={color} strokeWidth="1" />
        </marker>
      ))}
    </defs>
  )
}

function Note({ x, y, text, accent }: { x: number; y: number; text: string; accent?: boolean }) {
  return (
    <text x={x} y={y} fontSize={9.5} fill={accent ? ACCENT : INK3} letterSpacing="0.02em">
      {text}
    </text>
  )
}

/* ── 1. Unified recommendation ─────────────────────────── */

function Unified() {
  const inputs = ['用户行为序列', '物品属性', '上下文特征']
  // Token count tapers left→right: L → L/2 → L/4. The taper *is* the pyramid.
  const stacks = [
    { x: 250, n: 10, label: 'L' },
    { x: 330, n: 6, label: 'L/2' },
    { x: 410, n: 3, label: 'L/4' },
  ]
  const CY = 88
  return (
    <svg viewBox="0 0 700 200" className="h-auto w-full" role="img" aria-label="统一推荐架构图">
      <Defs />
      <Note x={0} y={14} text="异构特征" />
      {inputs.map((t, i) => (
        <Box key={t} x={0} y={26 + i * 44} w={98} h={32} label={t} />
      ))}
      {inputs.map((_, i) => (
        <Arrow key={i} x1={100} y1={42 + i * 44} x2={126} y2={CY} />
      ))}

      <Box x={128} y={CY - 21} w={88} h={42} label="统一分词" sub="同一语义空间" accent />
      <Arrow x1={218} y1={CY} x2={246} y2={CY} accent />

      {/* Each stack is a layer of surviving tokens after that round of pruning. */}
      {stacks.map((st, si) => {
        const h = st.n * 13 - 3
        const y0 = CY - h / 2
        return (
          <g key={st.label}>
            {Array.from({ length: st.n }).map((_, i) => (
              <rect
                key={i}
                x={st.x}
                y={y0 + i * 13}
                width={10}
                height={10}
                rx={2}
                fill={si === 2 ? ACCENT : 'none'}
                fillOpacity={si === 2 ? 0.12 : 1}
                stroke={si === 2 ? ACCENT : LINE}
                strokeWidth={1}
              />
            ))}
            <text x={st.x + 5} y={CY + h / 2 + 14} textAnchor="middle" fontSize={9} fill={INK3}>
              {st.label}
            </text>
            {si < stacks.length - 1 && (
              <Arrow x1={st.x + 14} y1={CY} x2={stacks[si + 1].x - 4} y2={CY} />
            )}
          </g>
        )
      })}
      <Note x={250} y={22} text="统一 Transformer · 金字塔堆叠（逐层剪枝）" />

      <Arrow x1={424} y1={CY} x2={456} y2={CY} accent />
      <Box x={458} y={CY - 21} w={110} h={42} label="端到端输出" sub="单阶段" accent />

      <Note x={586} y={CY - 4} text="O(L²) → O(L)" accent />
      <Note x={586} y={CY + 12} text="KV 缓存复用" />

      <Note
        x={0}
        y={188}
        text="混合参数化：序列 Token 共享参数以提升效率，非序列 Token 保留独立参数以维持语义"
      />
    </svg>
  )
}

/* ── 2. P5 + RL + Memory ───────────────────────────────── */

function P5RL() {
  return (
    <svg viewBox="0 0 700 205" className="h-auto w-full" role="img" aria-label="P5 加强化学习与记忆架构图">
      <Defs />
      <Note x={0} y={16} text="主链路" />
      <Box x={0} y={28} w={108} h={40} label="用户行为序列" sub="Amazon Beauty" />
      <Arrow x1={110} y1={48} x2={140} y2={48} />
      <Box x={142} y={28} w={102} h={40} label="P5 框架" sub="T5 骨干 · Prompt" />
      <Arrow x1={246} y1={48} x2={276} y2={48} />
      <Box x={278} y={28} w={104} h={40} label="候选物品集" accent />
      <Arrow x1={384} y1={48} x2={414} y2={48} />
      <Box x={416} y={28} w={100} h={40} label="Top-K 推荐" />
      <Note x={534} y={44} text="HR@10  2.4%" accent />
      <Note x={534} y={60} text="随机基线  0.17%" />

      {/* The RL policy replaces Beam Search as the thing that picks candidates. */}
      <Note x={0} y={112} text="替代 Beam Search" />
      <Box
        x={142}
        y={118}
        w={152}
        h={46}
        label="POMDP 策略网络"
        sub="MLP · 16 离散宏动作 · ε-greedy"
        accent
      />
      <Arrow x1={218} y1={116} x2={218} y2={72} accent />
      <Note x={224} y={98} text="驱动动态检索" accent />

      <Box
        x={318}
        y={118}
        w={152}
        h={46}
        label="FAISS 长短期记忆"
        sub="短期缓冲 · 长期索引 · 时间衰减"
      />
      <Arrow x1={314} y1={141} x2={298} y2={141} both />

      <Box x={494} y={118} w={160} h={46} label="共现矩阵 Item Embedding" sub="CPU 约 1s · 128 维" />
      <Arrow x1={490} y1={141} x2={474} y2={141} dashed />

      <Note x={0} y={192} text="四阶段实验：P5 基线训练 → 评估 → RL+Memory 对比 → 5 变体消融" />
    </svg>
  )
}

/* ── 3. Cat: RL → BT → LLM ─────────────────────────────── */

function CatSystem() {
  const rows = [
    { label: '策略层', cy: 48 },
    { label: '行为树层', cy: 110 },
    { label: '文本层', cy: 172 },
  ]
  return (
    <svg viewBox="0 0 700 232" className="h-auto w-full" role="img" aria-label="猫咪三层决策架构图">
      <Defs />
      {rows.map((r) => (
        <text key={r.label} x={0} y={r.cy + 4} fontSize={10} fill={INK3}>
          {r.label}
        </text>
      ))}
      <line x1={58} y1={22} x2={58} y2={196} stroke={LINE} strokeWidth={1} />

      {/* 1 — intent */}
      <Box x={70} y={28} w={88} h={40} label="422 维状态" />
      <Arrow x1={160} y1={48} x2={190} y2={48} />
      <Box x={192} y={28} w={140} h={40} label="Transformer + FiLM" sub="BC 预训练 → PPO" accent />
      <Arrow x1={334} y1={48} x2={364} y2={48} accent />
      <Box x={366} y={28} w={112} h={40} label="15 种宏观意图" accent />

      {/* 2 — safety: intent becomes a controllable action sequence */}
      <Arrow x1={422} y1={70} x2={422} y2={88} accent />
      <Box
        x={192}
        y={90}
        w={286}
        h={40}
        label="轻量行为树引擎"
        sub="Selector · Sequence · Parallel · Decorator"
      />
      <Arrow x1={480} y1={110} x2={510} y2={110} />
      <Box x={512} y={90} w={116} h={40} label="原子动作序列" sub="可控执行" />

      {/* 3 — voice */}
      <Arrow x1={250} y1={132} x2={250} y2={150} />
      <Box
        x={192}
        y={152}
        w={172}
        h={40}
        label="DeepSeek-R1-Distill 1.5B"
        sub="Q4_0 量化 · 本地约 1GB"
      />
      <Arrow x1={366} y1={172} x2={396} y2={172} />
      <Box x={398} y={152} w={140} h={40} label="内心独白 20–30 字" sub="缓存 + 模板降级" />

      {/* The two mechanisms that cut across all three layers. */}
      <line x1={70} y1={206} x2={646} y2={206} stroke={ACCENT} strokeWidth={1} strokeDasharray="3 3" />
      {[[478, 48], [628, 110], [538, 172]].map(([x, y]) => (
        <line
          key={y}
          x1={x}
          y1={y}
          x2={646}
          y2={y}
          stroke={ACCENT}
          strokeWidth={1}
          strokeDasharray="3 3"
        />
      ))}
      <line x1={646} y1={48} x2={646} y2={206} stroke={ACCENT} strokeWidth={1} strokeDasharray="3 3" />
      <text x={70} y={224} fontSize={9.5} fill={ACCENT}>
        贯穿三层：性格过滤器（意图偏置 / 行为参数加权 / 文本关键词禁止）
      </text>
      <text x={392} y={224} fontSize={9.5} fill={INK2}>
        × 双层记忆（工作记忆 20 · 长期记忆 500 · 向量语义检索）
      </text>
    </svg>
  )
}
