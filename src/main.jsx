import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource/instrument-serif/latin-italic.css'
import '@fontsource-variable/noto-sans-devanagari/index.css'
import '@fontsource/tiro-devanagari-hindi/devanagari-italic.css'
import 'lenis/dist/lenis.css'
import './index.css'
import App from './App.jsx'
import { matchRoute } from './router/routes.js'

const root = document.getElementById('root')
const path = window.location.pathname
const app = (
  <StrictMode>
    <App path={path} />
  </StrictMode>
)

// Production HTML is pre-rendered (see scripts/prerender.mjs) — hydrate it when it was rendered
// for this URL. Some hosts answer unknown URLs with another page's HTML; then render fresh.
const served = root.dataset.path ? matchRoute(root.dataset.path) : null
const current = matchRoute(path)
const sameRoute = served && (served.path === current.path || (served.page === 'notFound' && current.page === 'notFound'))

if (root.firstElementChild && sameRoute) {
  hydrateRoot(root, app)
} else {
  root.replaceChildren()
  createRoot(root).render(app)
}
