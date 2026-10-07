import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Fonts are now system faces (Times New Roman for Latin/numerals, 宋体/楷体 for
// CJK) — no self-hosted webfonts needed, so nothing leaves the origin.
import './index.css'
import App from './App'
import { I18nProvider } from './i18n'
import { ThemeProvider } from './theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <App />
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
)
