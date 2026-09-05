import { useEffect, useState } from 'react'
import { email } from '../data/content'
import { useI18n } from '../i18n'
import { Reveal } from './Reveal'

export function Contact() {
  const { t } = useI18n()
  const { profile } = t
  // Assembled after mount so the address never sits in the static HTML.
  const [addr, setAddr] = useState('')
  const [copied, setCopied] = useState(false)
  useEffect(() => setAddr(email()), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email())
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard denied (insecure context, or the user said no) — the mailto
      // link beside this button still works, so there is nothing to report.
    }
  }

  return (
    <footer
      id="contact"
      aria-labelledby="contact-label"
      className="mt-16 border-t border-line bg-surface/50"
    >
      <div className="mx-auto w-full max-w-[1180px] px-6 py-20 sm:px-10 md:py-24 lg:px-16 lg:py-32">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
            <h2 id="contact-label" className="label-en">
              Contact
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="font-heading mt-10 max-w-[22ch] text-[clamp(2rem,6.5vw,3.75rem)] leading-[1.15] font-medium tracking-tight text-ink">
            {t.ui.contactHeading[0]}
            <br />
            {t.ui.contactHeading[1]}
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-8 max-w-[34rem] text-[0.9375rem] text-ink-2">
            {t.ui.contactIntro}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-12 flex flex-col gap-x-14 gap-y-8 sm:flex-row">
            <div>
              <p className="label-en">GitHub</p>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline mt-2.5 inline-block text-[1.125rem] text-ink transition-colors hover:text-accent"
              >
                @{profile.githubHandle}
              </a>
            </div>

            <div>
              <p className="label-en">Email</p>
              <div className="mt-2.5 flex flex-wrap items-center gap-3">
                {addr ? (
                  <a
                    href={`mailto:${addr}`}
                    className="link-underline text-[1.125rem] text-ink transition-colors hover:text-accent"
                  >
                    {addr}
                  </a>
                ) : (
                  <span className="text-[1.125rem] text-ink-3">{t.ui.loading}</span>
                )}
                <button
                  type="button"
                  onClick={copy}
                  disabled={!addr}
                  className="rounded-full border border-line px-3 py-1 text-[0.6875rem] text-ink-2 transition-colors duration-300 hover:border-accent/40 hover:bg-accent-soft hover:text-accent disabled:opacity-40"
                >
                  {copied ? t.ui.copied : t.ui.copy}
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 flex flex-col gap-3 border-t border-line pt-8 text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {profile.name} · {profile.nameLatin}
          </p>
          <p>{t.ui.footerNote}</p>
        </div>
      </div>
    </footer>
  )
}
