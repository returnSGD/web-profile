import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Fonts are now system faces (Times New Roman for Latin/numerals, 宋体/楷体 for
// CJK) — no self-hosted webfonts needed, so nothing leaves the origin.
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
