import * as t from 'src/types'

type StorageValueMapper<T> = {
  stringify: (value: T) => string
  parse: (str: string | null) => T
}

const mappers: Record<string, StorageValueMapper<any>> = {
  string: {
    stringify: (s: string) => s,
    parse: (s: string | null) => s ?? ''
  },
  json: {
    stringify: (obj: any) => JSON.stringify(obj),
    parse: (s: string | null) => (s ? JSON.parse(s) : {})
  },
  boolean: {
    stringify: (bool: boolean) => (bool ? 'yes' : 'no'),
    parse: (s: string | null) => (s === 'yes' ? true : false)
  }
}

const localStorageItem = <T>(key: string, mappers: StorageValueMapper<T>) => {
  const k = `px.${key}`
  return {
    get: () => {
      return mappers.parse(localStorage.getItem(k))
    },
    set: (value: T) => {
      localStorage.setItem(k, mappers.stringify(value))
    },
    clear: () => {
      localStorage.removeItem(k)
    }
  }
}

export const isAdmin = localStorageItem<boolean>('is-admin', mappers.boolean)
export const skipCache = localStorageItem<boolean>('skip-cache', mappers.boolean)
export const skipAnalytics = localStorageItem<boolean>('skip-analytics', mappers.boolean)
export const session = localStorageItem<t.TrackedSession>('session', mappers.json)

export default {
  isAdmin,
  skipCache,
  skipAnalytics,
  session
}
