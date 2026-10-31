import { useSyncExternalStore } from 'react'
import { getOpenStatus, todayIST } from '../lib/contact.js'

// Time-dependent values only exist in the browser; the server snapshot is null
// so pre-rendered HTML hydrates without mismatches.

const subscribeMinute = (callback) => {
  const id = setInterval(callback, 30_000)
  return () => clearInterval(id)
}

/** true / false once on the client, null during pre-render. */
export function useOpenNow() {
  return useSyncExternalStore(
    subscribeMinute,
    () => getOpenStatus().isOpen,
    () => null,
  )
}

/** Today's date in IST (YYYY-MM-DD) on the client, '' during pre-render. */
export function useTodayIST() {
  return useSyncExternalStore(subscribeMinute, todayIST, () => '')
}
