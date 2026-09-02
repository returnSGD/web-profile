import { about } from '../data/resume'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function About() {
  return (
    <Section id="about" label="About" heading="关于">
      <Reveal>
        <ul className="flex flex-col gap-1.5 border-b border-line pb-8 sm:flex-row sm:gap-8 sm:pb-9">
          {about.meta.map((m) => (
            <li key={m} className="text-sm text-ink-2">
              {m}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-10 max-w-[46rem] space-y-7">
        {about.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <p
              className={
                i === 0
                  ? 'text-[1.125rem] text-ink sm:text-[1.25rem] sm:leading-[1.8]'
                  : 'text-[0.9375rem] text-ink-2 sm:text-base'
              }
            >
              {p}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
