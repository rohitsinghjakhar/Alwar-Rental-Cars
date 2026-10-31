import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { ROUTES, NOT_FOUND, matchRoute } from './router/routes.js'
import { getHead, headToHtml } from './seo/meta.js'
import { SITE_URL } from './seo/schema.js'
import { buildLlmsTxt } from './seo/llms.js'

export { ROUTES, NOT_FOUND, SITE_URL, buildLlmsTxt }

export function render(path) {
  const route = matchRoute(path)
  const head = getHead(route)
  const html = renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>,
  )
  return { html, head: headToHtml(head), lang: head.lang, alternates: head.alternates }
}
