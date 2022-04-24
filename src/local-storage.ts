import * as t from 'src/types'
import duration from 'src/duration-fns'

type StoredItem <T> = {
  value: T
  expiration: number | null
}

export interface LocalStorageItem <T = any> {
  get: () => T
  set: (value: T) => void
  clear: () => void
}

const isExpired = (expiration: number | null) => {
  if (!expiration) return false
  return expiration < Date.now()
}

export const localStorageItem = <T>(key: string, defaultValue: T, exp: t.Duration | 'never' = 'never'): LocalStorageItem<T> => {
  const k = `px.${key}`
  const clear = () => {
    localStorage.removeItem(k)
  }
  const get = () => {
    const raw = localStorage.getItem(k)
    if (!raw) return defaultValue
    const { expiration, value } = JSON.parse(raw) as StoredItem<T>
    if (isExpired(expiration)) {
      clear()
      return defaultValue
    }
    return value
  }
  const set = (value: T) => {
    const item: StoredItem<T> = {
      expiration: exp === 'never' ? null : (Date.now() + duration.parse(exp, 'milliseconds')),
      value
    }
    localStorage.setItem(k, JSON.stringify(item))
  }
  return {
    get, set, clear
  }
}

export const isAdmin = localStorageItem<boolean>('is-admin.v2', false,)
export const skipCache = localStorageItem<boolean>('skip-cache.v2', false,)
export const skipAnalytics = localStorageItem<boolean>('skip-analytics.v2', false,)
export const session = localStorageItem<t.LocalSession | null>('session.local.v2', null)
export const abstract = localStorageItem<t.AbstractData | null>('abstract.v2', null, '15 minutes')
export const geolocation = localStorageItem<t.GeoLocation | null>('geolocation.v2', null, '15 minutes')

export default {
  isAdmin,
  skipCache,
  skipAnalytics,
  session,
  abstract,
  geolocation
}
