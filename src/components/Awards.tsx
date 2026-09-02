import { awards } from '../data/resume'
import { Reveal } from './Reveal'
import { Section } from './Section'

/** Intentionally the quietest section on the page. */
export function Awards() {
  return (
    <Section id="awards" label="Selected Awards">
      <ul className="flex flex-col">
        {awards.map((a, i) => (
          <Reveal as="li" key={a.title} delay={i * 0.04}>
            <div className="grid gap-x-8 gap-y-1 border-t border-line py-5 sm:grid-cols-[5.5rem_1fr]">
              <span className="text-xs text-ink-3 tabular-nums">{a.year}</span>
              <div>
                <h3 className="text-[0.9375rem] text-ink">{a.title}</h3>
                <p className="mt-1 max-w-[42rem] text-[0.8125rem] text-ink-3">{a.detail}</p>
              </div>
            </div>
          </Reveal>
        ))}
        <li className="border-t border-line" aria-hidden="true" />
      </ul>
    </Section>
  )
}
