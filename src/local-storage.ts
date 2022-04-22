import * as t from 'src/types'

type StorageValueMapper<T> = {
  stringify: (value: T) => string
  parse: (str: string | null) => T
}

export interface LocalStorageItem <T = any> {
  get: () => T
  set: (value: T) => void
  clear: () => void
}

export const mappers: Record<string, (defaultValue?: any) => StorageValueMapper<any>> = {
  string: (defaultValue: string = '') => ({
    stringify: (s: string) => s,
    parse: (s: string | null) => s ?? defaultValue
  }),
  json: (defaultValue: any = {}) => ({
    stringify: (obj: any) => JSON.stringify(obj),
    parse: (s: string | null) => (s ? JSON.parse(s) : defaultValue)
  }),
  boolean: (defaultValue: boolean = false) => ({
    stringify: (bool: boolean) => (bool ? 'yes' : 'no'),
    parse: (s: string | null) => s === null || s === undefined ? defaultValue : (s === 'yes' ? true : false)
  })
}

export const localStorageItem = <T>(key: string, mappers: StorageValueMapper<T>): LocalStorageItem<T> => {
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

export const isAdmin = localStorageItem<boolean>('is-admin', mappers.boolean())
export const skipCache = localStorageItem<boolean>('skip-cache', mappers.boolean())
export const skipAnalytics = localStorageItem<boolean>('skip-analytics', mappers.boolean())
export const session = localStorageItem<t.LocalSession>('session.local', mappers.json(null))

export default {
  isAdmin,
  skipCache,
  skipAnalytics,
  session
}
