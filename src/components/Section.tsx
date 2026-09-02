import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  /** Small uppercase Latin label — the editorial anchor for a Chinese page. */
  label: string
  /** Optional Chinese heading shown beneath the label in the left rail. */
  heading?: string
  children: ReactNode
  /** Lay the label above the content instead of in a left rail. */
  stacked?: boolean
  className?: string
}

/**
 * The editorial two-column shell: a narrow left rail carrying the Latin label,
 * a wide right column carrying Chinese content. Collapses to one column below `lg`.
 */
export function Section({
  id,
  label,
  heading,
  children,
  stacked = false,
  className = '',
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-label`}
      className={`mx-auto w-full max-w-[1180px] px-6 py-20 sm:px-10 md:py-24 lg:px-16 lg:py-28 ${className}`}
    >
      {stacked ? (
        <>
          <Reveal>
            <SectionLabel id={id} label={label} heading={heading} />
          </Reveal>
          <div className="mt-12 md:mt-16">{children}</div>
        </>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <SectionLabel id={id} label={label} heading={heading} />
            </div>
          </Reveal>
          <div>{children}</div>
        </div>
      )}
    </section>
  )
}

function SectionLabel({
  id,
  label,
  heading,
}: {
  id: string
  label: string
  heading?: string
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
        <h2 id={`${id}-label`} className="label-en">
          {label}
        </h2>
      </div>
      {heading && (
        <p className="font-heading mt-4 text-[1.375rem] leading-snug font-medium tracking-tight text-ink md:text-[1.625rem]">
          {heading}
        </p>
      )}
    </div>
  )
}
