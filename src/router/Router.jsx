import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { matchRoute, normalizePath } from './routes.js'

const RouterContext = createContext(null)

/**
 * Minimal client router: every URL is also a real pre-rendered page, so links work without
 * JavaScript; with JavaScript, navigation is instant and animated.
 */
export function RouterProvider({ initialPath, children }) {
  const [path, setPath] = useState(() => normalizePath(initialPath))
  const route = useMemo(() => matchRoute(path), [path])
  // Where to scroll once the next page has rendered: { y } on back/forward, { hash } for anchors.
  const pendingScroll = useRef(null)
  const currentPath = useRef(path)

  useEffect(() => {
    currentPath.current = path
  }, [path])

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    const onPop = (event) => {
      const next = normalizePath(window.location.pathname)
      if (next === currentPath.current) return // in-page #anchor, not a page change
      pendingScroll.current = { y: event.state?.y ?? 0 }
      setPath(next)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((to) => {
    const url = new URL(to, window.location.href)
    if (url.origin !== window.location.origin) {
      window.location.assign(url.href)
      return
    }
    const next = normalizePath(url.pathname)
    const hash = decodeURIComponent(url.hash.slice(1))
    if (next === normalizePath(window.location.pathname)) {
      pendingScroll.current = hash ? { hash } : { y: 0 }
      window.dispatchEvent(new Event('router:samepage'))
      return
    }
    window.history.replaceState({ y: window.scrollY }, '')
    window.history.pushState({ y: 0 }, '', next + url.hash)
    pendingScroll.current = hash ? { hash } : { y: 0 }
    setPath(next)
  }, [])

  const takePendingScroll = useCallback(() => {
    const value = pendingScroll.current
    pendingScroll.current = null
    return value
  }, [])

  const value = useMemo(() => ({ path, route, navigate, takePendingScroll }), [path, route, navigate, takePendingScroll])
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter() {
  return useContext(RouterContext)
}

export function Link({ to, onClick, target, children, ...props }) {
  const { navigate } = useRouter()
  const handleClick = (event) => {
    onClick?.(event)
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || target) return
    event.preventDefault()
    navigate(to)
  }
  return (
    <a href={to} target={target} {...props} onClick={handleClick}>
      {children}
    </a>
  )
}
