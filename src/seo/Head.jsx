import { useEffect } from 'react'
import { getHead, headTags } from './meta.js'

/** Keeps <head> in sync on client-side navigation (pre-rendered pages already ship the same tags). */
export default function HeadManager({ route }) {
  useEffect(() => {
    const head = getHead(route)
    document.documentElement.lang = head.lang
    document.title = head.title
    document.head.querySelectorAll('[data-h]').forEach((node) => node.remove())

    const fragment = document.createDocumentFragment()
    for (const [tag, attrs] of headTags(head)) {
      const el = document.createElement(tag)
      el.setAttribute('data-h', '')
      for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value)
      fragment.appendChild(el)
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-h', '')
    script.textContent = JSON.stringify(head.jsonLd)
    fragment.appendChild(script)
    document.head.appendChild(fragment)
  }, [route])

  return null
}
