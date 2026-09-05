import { motion } from 'framer-motion'
import { email } from '../data/content'
import { useI18n } from '../i18n'
import { SystemCanvas } from './SystemCanvas'

const EASE = [0.22, 1, 0.36, 1] as const

/** Blur→sharp is used exactly once on this site: here. */
const title = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  shown: { opacity: 1, y: 0, filter: 'blur(0px)' },
}
const rise = {
  hidden: { opacity: 0, y: 14 },
  shown: { opacity: 1, y: 0 },
}

export function Hero() {
  const { t, lang } = useI18n()
  const { profile } = t
  const sep = lang === 'zh' ? '　·　' : ' · '
  return (
    <section
      id="top"
      className="mx-auto w-full max-w-[1180px] px-6 pt-28 pb-16 sm:px-10 md:pt-32 lg:px-16 lg:pt-36 lg:pb-24"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        {/* ── Left: the words ── */}
        <div className="order-1">
          <motion.p
            initial="hidden"
            animate="shown"
            variants={rise}
            transition={{ duration: 0.5, ease: EASE }}
            className="label-en"
          >
            Portfolio — {profile.nameLatin}
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="shown"
            variants={title}
            transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
            className="mt-6 text-[clamp(3.5rem,13vw,6.5rem)] leading-[0.98] font-medium tracking-[0.06em] text-ink"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="shown"
            variants={rise}
            transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
            className="mt-6 text-base font-normal tracking-wide text-ink-2 sm:text-lg"
          >
            {profile.focus.join(sep)}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="shown"
            variants={rise}
            transition={{ duration: 0.6, delay: 0.34, ease: EASE }}
            className="mt-9 max-w-[34rem]"
          >
            <span className="block h-px w-12 bg-line-strong" aria-hidden="true" />
            <p className="mt-6 text-[1.0625rem] text-ink sm:text-[1.125rem]">
              {profile.thesis}
            </p>
            <p className="mt-3 text-[0.9375rem] text-ink-2">
              {t.ui.heroSub}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="shown"
            variants={rise}
            transition={{ duration: 0.6, delay: 0.44, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
          >
            <HeroLink href={profile.github}>GitHub</HeroLink>
            <HeroLink href={`mailto:${email()}`}>Email</HeroLink>
          </motion.div>
        </div>

        {/* ── Right: the diagram ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
          className="order-2 -mx-2 sm:mx-0"
        >
          <SystemCanvas className="h-[240px] w-full sm:h-[320px] lg:h-[460px]" />
        </motion.div>
      </div>
    </section>
  )
}

function HeroLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith('http')
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      className="link-underline group inline-flex items-center gap-1.5 text-[0.9375rem] text-ink transition-colors hover:text-accent"
    >
      {children}
      <svg
        width="9"
        height="9"
        viewBox="0 0 10 10"
        fill="none"
        aria-hidden="true"
        className="translate-y-px opacity-40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      >
        <path d="M2 8L8 2M8 2H3.2M8 2v4.8" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </a>
  )
}
