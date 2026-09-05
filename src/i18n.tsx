import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { content, type Content, type Lang } from './data/content'

interface I18n {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
  t: Content
}

const STORAGE_KEY = 'lang'

/** English is the default. A saved preference (if any) is respected on return visits. */
function initialLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  return saved === 'zh' ? 'zh' : 'en'
}

const I18nContext = createContext<I18n | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN'
  }, [lang])

  const value: I18n = {
    lang,
    setLang,
    toggle: () => setLang((l) => (l === 'en' ? 'zh' : 'en')),
    t: content[lang],
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18n {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
