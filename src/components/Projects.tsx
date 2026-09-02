import { featuredProjects, secondaryProjects, type Project } from '../data/resume'
import { ProjectDiagram } from './ProjectDiagram'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Projects() {
  return (
    <Section id="projects" label="Projects" heading="项目" stacked>
      {/* Featured — one per row, room to breathe and carry a diagram. */}
      <div className="flex flex-col gap-20 md:gap-28">
        {featuredProjects.map((p, i) => (
          <FeaturedCard key={p.id} project={p} index={i + 1} />
        ))}
      </div>

      <div className="mt-24 border-t border-line pt-10 md:mt-32">
        <h3 className="label-en">Also built</h3>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {secondaryProjects.map((p, i) => (
            <SecondaryCard key={p.id} project={p} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </Section>
  )
}

function FeaturedCard({ project: p, index }: { project: Project; index: number }) {
  return (
    <Reveal as="article">
      <div className="flex flex-col gap-x-14 gap-y-6 lg:flex-row">
        <div className="lg:w-[15rem] lg:shrink-0">
          <span className="numeral text-[1.75rem] leading-none text-ink-3">
            {String(index).padStart(2, '0')}
          </span>
          <p className="mt-4 text-sm text-ink-2">{p.org}</p>
          <p className="mt-1 text-xs text-ink-3">{p.period}</p>
          {p.link && <ProjectLink href={p.link} className="mt-5" />}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-[1.625rem] leading-tight font-medium tracking-tight text-ink sm:text-[2rem]">
            {p.title}
          </h3>
          <p className="mt-4 max-w-[44rem] text-[1rem] text-ink-2 sm:text-[1.0625rem]">{p.lede}</p>

          <dl className="mt-8 flex flex-col border-t border-line">
            {p.contributions.map((c) => (
              <div
                key={c.label}
                className="group grid gap-1 border-b border-line py-4 transition-colors duration-400 hover:bg-surface/60 sm:grid-cols-[8.5rem_1fr] sm:gap-6"
              >
                <dt className="pt-px text-[0.8125rem] font-medium text-ink transition-colors duration-400 group-hover:text-accent">
                  {c.label}
                </dt>
                <dd className="text-[0.9375rem] text-ink-2">{c.text}</dd>
              </div>
            ))}
          </dl>

          {p.outcome && (
            <p className="mt-6 border-l-2 border-accent/40 bg-accent-soft/45 py-3 pr-4 pl-4 text-[0.9375rem] text-ink">
              {p.outcome}
            </p>
          )}

          <TagRow items={p.stack} className="mt-7" />

          <ProjectDiagram kind={p.diagram} />
        </div>
      </div>
    </Reveal>
  )
}

function SecondaryCard({ project: p, delay }: { project: Project; delay: number }) {
  return (
    <Reveal as="article" delay={delay} className="h-full">
      <div className="group flex h-full flex-col rounded-lg border border-line bg-surface/55 p-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface sm:p-7">
        <div className="flex items-baseline justify-between gap-4">
          <h4 className="text-[1.0625rem] font-medium tracking-tight text-ink">{p.title}</h4>
          <span className="shrink-0 text-xs text-ink-3">{p.period}</span>
        </div>
        <p className="mt-1 text-xs text-ink-3">{p.org}</p>
        <p className="mt-4 text-[0.9375rem] text-ink-2">{p.lede}</p>

        <ul className="mt-5 flex flex-col gap-2.5 border-t border-line pt-5">
          {p.contributions.map((c) => (
            <li key={c.label} className="text-[0.8125rem] leading-relaxed text-ink-2">
              <span className="font-medium text-ink">{c.label}</span>
              <span className="mx-1.5 text-ink-3">—</span>
              {c.text}
            </li>
          ))}
        </ul>

        {p.outcome && <p className="mt-4 text-[0.8125rem] text-accent">{p.outcome}</p>}

        <div className="mt-auto pt-6">
          <TagRow items={p.stack} small />
          {p.link && <ProjectLink href={p.link} className="mt-4" />}
        </div>
      </div>
    </Reveal>
  )
}

function TagRow({
  items,
  className = '',
  small = false,
}: {
  items: string[]
  className?: string
  small?: boolean
}) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-2 gap-y-2 ${className}`}>
      {items.map((t) => (
        <li
          key={t}
          className={`rounded-full border border-line px-2.5 py-1 text-ink-2 transition-colors duration-300 hover:border-accent/35 hover:bg-accent-soft hover:text-accent ${
            small ? 'text-[0.6875rem]' : 'text-xs'
          }`}
        >
          {t}
        </li>
      ))}
    </ul>
  )
}

function ProjectLink({ href, className = '' }: { href: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={`link-underline inline-flex items-center gap-1.5 text-[0.8125rem] text-ink transition-colors hover:text-accent ${className}`}
    >
      <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 014 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.19c0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
      </svg>
      GitHub
    </a>
  )
}
