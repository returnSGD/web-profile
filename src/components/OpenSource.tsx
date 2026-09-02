import { contributions, STAR_DATA_ASOF, type Contribution } from '../data/resume'
import { Reveal } from './Reveal'
import { Section } from './Section'

/**
 * Deliberately *not* a contribution calendar. A heat grid would have to be
 * invented — the résumé states PR-level facts, not daily activity. So the
 * section is anchored on the numbers that actually exist.
 */
export function OpenSource() {
  return (
    <Section id="open-source" label="Open Source" heading="开源贡献" stacked>
      <p className="max-w-[42rem] text-[1.0625rem] text-ink-2">
        比起写出更多代码，我更在意删掉多余的那部分。下面每一条都可以点开原始 PR 核验。
      </p>

      <div className="mt-14 flex flex-col">
        {contributions.map((c, i) => (
          <ContributionRow key={c.project} item={c} delay={i * 0.06} />
        ))}
        <div className="border-t border-line" aria-hidden="true" />
      </div>

      <p className="mt-6 text-xs text-ink-3">Star 数据截至 {STAR_DATA_ASOF}。</p>
    </Section>
  )
}

function ContributionRow({ item, delay }: { item: Contribution; delay: number }) {
  const merged = item.status === '已合并'
  return (
    <Reveal delay={delay}>
      <div className="group grid gap-x-10 gap-y-5 border-t border-line py-9 transition-colors duration-500 group-hover:border-line-strong md:grid-cols-[15rem_1fr] md:py-11">
        <div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
            <h3 className="text-[1.375rem] font-medium tracking-tight text-ink">{item.project}</h3>
            {item.stars && (
              <span className="inline-flex items-center gap-1 text-xs text-ink-3">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8 .8l2.2 4.5 5 .7-3.6 3.5.85 4.95L8 12.1l-4.45 2.35.85-4.95L.8 6l5-.7L8 .8z" />
                </svg>
                {item.stars}
              </span>
            )}
          </div>
          <div className="mt-3 flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] ${
                merged ? 'bg-accent-soft text-accent' : 'bg-surface-2 text-ink-2'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${merged ? 'bg-accent' : 'bg-ink-3'}`}
                aria-hidden="true"
              />
              {item.status}
            </span>
            <span className="text-xs text-ink-3">{item.period}</span>
          </div>
        </div>

        <div className="min-w-0">
          <p className="max-w-[44rem] text-[0.9375rem] text-ink-2">{item.summary}</p>

          <ul className="mt-5 flex flex-col gap-3">
            {item.points.map((p, i) => (
              <li key={i} className="flex gap-3 text-[0.9375rem] text-ink-2">
                <span
                  className="mt-2.5 h-px w-3 shrink-0 bg-line-strong transition-colors duration-400 group-hover:bg-accent"
                  aria-hidden="true"
                />
                <span className="max-w-[44rem]">{p}</span>
              </li>
            ))}
          </ul>

          {item.stats && (
            <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-4">
              {item.stats.map((s) => (
                <div key={s.label}>
                  <dd className="numeral text-[1.75rem] leading-none text-ink">{s.value}</dd>
                  <dt className="mt-1.5 text-[0.6875rem] tracking-wide text-ink-3">{s.label}</dt>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
            {item.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline text-[0.8125rem] text-ink transition-colors hover:text-accent"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  )
}
