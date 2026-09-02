import { stack } from '../data/resume'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Stack() {
  return (
    <Section id="stack" label="Stack" heading="技术栈">
      <div className="flex flex-col">
        {stack.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.05}>
            <div className="grid gap-x-10 gap-y-3 border-t border-line py-6 sm:grid-cols-[13rem_1fr] sm:py-7">
              <div>
                <p className="label-en">{group.label}</p>
                <p className="mt-1.5 text-sm text-ink-2">{group.title}</p>
              </div>
              <ul className="flex flex-wrap items-center gap-x-1 gap-y-1">
                {group.items.map((item, j) => (
                  <li key={item} className="flex items-center">
                    {j > 0 && (
                      <span className="px-2 text-ink-3 select-none" aria-hidden="true">
                        ·
                      </span>
                    )}
                    <span className="cursor-default rounded px-1.5 py-0.5 text-[0.9375rem] text-ink transition-colors duration-300 hover:bg-accent-soft hover:text-accent">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
        <div className="border-t border-line" aria-hidden="true" />
      </div>
    </Section>
  )
}
