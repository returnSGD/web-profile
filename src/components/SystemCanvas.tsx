import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/useReducedMotion'
import { useI18n } from '../i18n'

/**
 * The site's one visual gimmick: a quiet diagram of 数据 → 模型 → 智能体 → 系统.
 *
 * Design constraints it holds itself to:
 *  - At rest it must read as a flat illustration, not "something that moves".
 *  - Node displacement never exceeds MAX_PULL px, so nothing lurches.
 *  - Off-screen it stops entirely; with reduced-motion it paints one static frame.
 */

/** Normalised anchor positions — a loose quadrilateral, deliberately un-symmetric. */
const ANCHORS: [number, number][] = [
  [0.13, 0.31],
  [0.6, 0.15],
  [0.84, 0.62],
  [0.31, 0.84],
]

/** The narrative chain, plus two cross-links so it reads as a system not a ring. */
const CHAIN: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
]
const CROSS: [number, number][] = [[0, 2]]

const INK = '24, 24, 24'
const ACCENT = '43, 76, 134'

const MAX_PULL = 6 // px — hard ceiling on cursor-driven displacement
const PULL_RADIUS = 150 // px
const LOOP_MS = 9000 // one full trip of the signal

interface Satellite {
  parent: number
  angle: number
  dist: number
  phase: number
  r: number
}

function buildSatellites(count: number): Satellite[] {
  const out: Satellite[] = []
  // Deterministic placement — no Math.random, so every load looks identical.
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < count; j++) {
      const angle = (i * 1.7 + j * 2.399) % (Math.PI * 2)
      out.push({
        parent: i,
        angle,
        dist: 34 + ((i + j * 3) % 4) * 10,
        phase: (i * 1.3 + j * 0.9) % (Math.PI * 2),
        r: j % 2 === 0 ? 1.6 : 1.2,
      })
    }
  }
  return out
}

export function SystemCanvas({ className = '' }: { className?: string }) {
  const { t } = useI18n()
  const nodeLabels = t.ui.systemNodes
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = 1
    let raf = 0
    let visible = true
    let start = 0

    // Cursor state, held in refs-by-closure so the RAF loop never re-binds.
    const pointer = { x: -9999, y: -9999, active: false }

    let satellites = buildSatellites(2)

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // Thin out the decoration on small canvases.
      satellites = buildSatellites(width < 420 ? 1 : 2)
    }

    /** Node position at time t, including breathing and cursor pull. */
    const nodeAt = (i: number, t: number): [number, number] => {
      const [nx, ny] = ANCHORS[i]
      const bx = nx * width
      const by = ny * height
      // Breathing: 5s period, ±1.5px. Below the threshold of "look, animation".
      const breathe = Math.sin(t / 5000 + i * 1.9) * 1.5
      let x = bx + breathe
      let y = by + Math.cos(t / 5600 + i * 2.4) * 1.5

      if (pointer.active) {
        const dx = pointer.x - x
        const dy = pointer.y - y
        const d = Math.hypot(dx, dy)
        if (d < PULL_RADIUS && d > 0.01) {
          const force = (1 - d / PULL_RADIUS) ** 2 * MAX_PULL
          x += (dx / d) * force
          y += (dy / d) * force
        }
      }
      return [x, y]
    }

    /** Distance from the cursor, normalised 0..1 (1 = right on top of it). */
    const proximity = (x: number, y: number) => {
      if (!pointer.active) return 0
      const d = Math.hypot(pointer.x - x, pointer.y - y)
      return d > PULL_RADIUS ? 0 : (1 - d / PULL_RADIUS) ** 2
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)
      const pts = ANCHORS.map((_, i) => nodeAt(i, t))

      // ── Cross-links: structure, barely there ──────────────
      ctx.lineWidth = 1
      for (const [a, b] of CROSS) {
        ctx.strokeStyle = `rgba(${INK}, 0.055)`
        ctx.beginPath()
        ctx.moveTo(pts[a][0], pts[a][1])
        ctx.lineTo(pts[b][0], pts[b][1])
        ctx.stroke()
      }

      // ── Satellites: faint orbit dots tethered to their node ──
      for (const s of satellites) {
        const [px, py] = pts[s.parent]
        const a = s.angle + Math.sin(t / 7000 + s.phase) * 0.14
        const sx = px + Math.cos(a) * s.dist
        const sy = py + Math.sin(a) * s.dist
        ctx.strokeStyle = `rgba(${INK}, 0.045)`
        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(sx, sy)
        ctx.stroke()
        ctx.fillStyle = `rgba(${INK}, ${0.13 + proximity(sx, sy) * 0.22})`
        ctx.beginPath()
        ctx.arc(sx, sy, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // ── The chain: 数据 → 模型 → 智能体 → 系统 ─────────────
      for (const [a, b] of CHAIN) {
        const near = Math.max(proximity(...(pts[a] as [number, number])), proximity(...(pts[b] as [number, number])))
        ctx.strokeStyle = `rgba(${ACCENT}, ${0.24 + near * 0.22})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(pts[a][0], pts[a][1])
        ctx.lineTo(pts[b][0], pts[b][1])
        ctx.stroke()
      }

      // ── The signal: one dot walking the chain, 9s per lap ──
      const prog = ((t % LOOP_MS) / LOOP_MS) * CHAIN.length
      const seg = Math.floor(prog)
      const f = prog - seg
      const [ai, bi] = CHAIN[seg]
      // Ease within each hop so it pauses very slightly at every node.
      const eased = f < 0.5 ? 2 * f * f : 1 - (-2 * f + 2) ** 2 / 2
      const sx = pts[ai][0] + (pts[bi][0] - pts[ai][0]) * eased
      const sy = pts[ai][1] + (pts[bi][1] - pts[ai][1]) * eased

      const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 14)
      glow.addColorStop(0, `rgba(${ACCENT}, 0.16)`)
      glow.addColorStop(1, `rgba(${ACCENT}, 0)`)
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(sx, sy, 14, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = `rgba(${ACCENT}, 0.85)`
      ctx.beginPath()
      ctx.arc(sx, sy, 2.4, 0, Math.PI * 2)
      ctx.fill()

      // ── Nodes + labels ────────────────────────────────────
      ctx.font = '500 11px "Times New Roman", "SimSun", "宋体", serif'
      ctx.textBaseline = 'middle'

      pts.forEach(([x, y], i) => {
        const near = proximity(x, y)

        ctx.strokeStyle = `rgba(${ACCENT}, ${0.2 + near * 0.3})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(x, y, 9 + near * 1.5, 0, Math.PI * 2)
        ctx.stroke()

        ctx.fillStyle = `rgba(${ACCENT}, ${0.75 + near * 0.25})`
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fill()

        // Keep labels inside the canvas: flip side past the midline.
        const left = x > width * 0.55
        ctx.textAlign = left ? 'right' : 'left'
        ctx.fillStyle = `rgba(${INK}, ${0.46 + near * 0.3})`
        ctx.fillText(nodeLabels[i], x + (left ? -22 : 22), y)
      })
    }

    const frame = (now: number) => {
      if (!start) start = now
      draw(now - start)
      raf = requestAnimationFrame(frame)
    }

    const onPointerMove = (e: PointerEvent) => {
      // Coarse pointers (touch) don't get the parallax — it fights scrolling.
      if (e.pointerType === 'touch') return
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
    }
    const onPointerLeave = () => {
      pointer.active = false
      pointer.x = -9999
      pointer.y = -9999
    }

    resize()

    if (reduced) {
      // One static frame, held. Everything else stays unbound.
      draw(2200)
      const ro = new ResizeObserver(() => {
        resize()
        draw(2200)
      })
      ro.observe(wrap)
      return () => ro.disconnect()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    // Don't burn frames on a canvas nobody can see.
    const io = new IntersectionObserver(
      ([entry]) => {
        const next = entry.isIntersecting
        if (next === visible) return
        visible = next
        if (visible) {
          raf = requestAnimationFrame(frame)
        } else {
          cancelAnimationFrame(raf)
        }
      },
      { threshold: 0 },
    )
    io.observe(wrap)

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
      } else if (visible) {
        raf = requestAnimationFrame(frame)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    wrap.addEventListener('pointermove', onPointerMove)
    wrap.addEventListener('pointerleave', onPointerLeave)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      wrap.removeEventListener('pointermove', onPointerMove)
      wrap.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [reduced, nodeLabels])

  return (
    <div
      ref={wrapRef}
      className={`relative ${className}`}
      role="img"
      aria-label={t.ui.systemAria}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
