import { createContext, useContext, useMemo } from 'react'
import en from './en.js'
import hi from './hi.js'
import { pathFor } from '../router/routes.js'

export const DICTIONARIES = { en, hi }

const I18nContext = createContext(null)

export function I18nProvider({ lang, children }) {
  const value = useMemo(
    () => ({
      lang,
      t: DICTIONARIES[lang] ?? en,
      /** Pick the current language from a bilingual `{ en, hi }` value. */
      L: (value) => localize(value, lang),
      href: (page, param) => pathFor(page, lang, param),
    }),
    [lang],
  )
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  return useContext(I18nContext)
}

export function localize(value, lang) {
  if (value && typeof value === 'object' && !Array.isArray(value) && ('en' in value || 'hi' in value)) {
    return value[lang] ?? value.en
  }
  return value
}
