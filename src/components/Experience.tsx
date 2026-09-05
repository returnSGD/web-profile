import { useI18n } from '../i18n'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Experience() {
  const { t } = useI18n()
  const { timeline } = t
  return (
    <Section id="experience" label="Experience" heading={t.ui.headings.experience}>
      <ol className="relative">
        {timeline.map((item, i) => (
          <Reveal as="li" key={item.org} delay={i * 0.07} className="group relative">
            <div className="grid grid-cols-[3.5rem_1fr] gap-x-5 border-t border-line py-9 transition-colors duration-500 group-hover:border-line-strong sm:grid-cols-[7rem_1fr] sm:gap-x-8 sm:py-12 lg:grid-cols-[9rem_1fr] lg:gap-x-12">
              {/* Year — the visual anchor of the whole section. */}
              <div className="relative">
                <span className="numeral block text-[2rem] leading-none text-ink-3 transition-colors duration-500 group-hover:text-accent sm:text-[3.25rem] lg:text-[4rem]">
                  {item.year}
                </span>
                <span className="mt-3 hidden text-xs tracking-wide text-ink-3 sm:block">
                  {item.period}
                </span>
              </div>

              <div className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                <h3 className="text-lg font-medium tracking-tight text-ink sm:text-[1.375rem]">
                  {item.org}
                </h3>
                <p className="mt-1.5 text-sm text-ink-2">{item.role}</p>
                <p className="mt-1 text-xs text-ink-3 sm:hidden">{item.period}</p>

                <p className="mt-5 max-w-[42rem] text-[0.9375rem] text-ink-2">{item.detail}</p>

                {/* Present at rest, sharpened on hover — never hidden behind it. */}
                <ul className="mt-6 flex flex-wrap gap-2">
                  {item.keywords.map((k) => (
                    <li
                      key={k}
                      className="rounded-full border border-transparent bg-surface px-3 py-1 text-xs text-ink-2 opacity-70 transition-all duration-400 group-hover:border-line group-hover:bg-accent-soft group-hover:text-accent group-hover:opacity-100"
                    >
                      {k}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
        <li className="border-t border-line" aria-hidden="true" />
      </ol>
    </Section>
  )
}
