import { interests } from '../data/resume'
import { Reveal } from './Reveal'
import { Section } from './Section'

const ROWS = [
  { key: 'build', label: '在做' },
  { key: 'study', label: '在读' },
  { key: 'care', label: '在意' },
] as const

export function Research() {
  return (
    <Section id="research" label="Research" heading="关注的方向">
      <p className="max-w-[42rem] text-[1.0625rem] text-ink-2">
        与其罗列技能，不如说清楚：我在做什么、在读什么、以及真正在意哪个问题。
      </p>

      <div className="mt-14 flex flex-col">
        {interests.map((it, i) => (
          <Reveal key={it.index} delay={i * 0.06}>
            <article className="group relative border-t border-line py-9 md:py-11">
              {/* A hairline that draws itself in on hover — the only motion here. */}
              <span
                className="absolute top-0 left-0 h-px w-0 bg-accent transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
                aria-hidden="true"
              />
              <div className="grid gap-x-10 gap-y-5 md:grid-cols-[15rem_1fr]">
                <header>
                  <span className="numeral text-[1.5rem] leading-none text-ink-3 transition-colors duration-500 group-hover:text-accent">
                    {it.index}
                  </span>
                  <h3 className="mt-3 text-[1.25rem] leading-snug font-medium tracking-tight text-ink">
                    {it.title}
                  </h3>
                  <p className="mt-1.5 text-[0.6875rem] tracking-[0.08em] text-ink-3 uppercase">
                    {it.titleEn}
                  </p>
                </header>

                <dl className="flex flex-col gap-3.5">
                  {ROWS.map((r) => (
                    <div key={r.key} className="grid gap-1 sm:grid-cols-[3rem_1fr] sm:gap-5">
                      <dt className="pt-px text-[0.75rem] text-ink-3 transition-colors duration-500 group-hover:text-accent">
                        {r.label}
                      </dt>
                      <dd className="max-w-[42rem] text-[0.9375rem] text-ink-2">{it[r.key]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          </Reveal>
        ))}
        <div className="border-t border-line" aria-hidden="true" />
      </div>
    </Section>
  )
}
