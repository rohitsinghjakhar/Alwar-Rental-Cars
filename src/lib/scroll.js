// Shared Lenis instance so links can scroll smoothly from anywhere.
let lenis = null

export function setLenis(instance) {
  lenis = instance
}

export function getLenis() {
  return lenis
}

/**
 * Smooth-scroll to an element id ('top' for the page top). The fixed-header gap comes from
 * `scroll-padding-top` in index.css, which both Lenis and the browser apply.
 */
export function scrollToId(id) {
  const target = id === 'top' ? 0 : document.getElementById(id)
  if (target === null) return
  if (lenis) {
    lenis.scrollTo(target)
  } else if (target === 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/** Jump instantly (used when a new page mounts). */
export function jumpTo(y = 0) {
  if (lenis) lenis.scrollTo(y, { immediate: true, force: true })
  else window.scrollTo(0, y)
}
