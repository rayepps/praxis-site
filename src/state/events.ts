import _ from 'radash'
import { atom, atomFamily, selector } from 'recoil'
import * as t from '../types'
import ComplexQueryString from 'src/util/ComplexQueryString'
import * as uuid from 'uuid'

export const eventsState = atomFamily({
  key: 'px.events',
  default: null as t.Event | null
})

export const eventSearchState = atom({
  key: 'eventSearchState',
  default: {
    total: 0,
    results: [] as string[]
  }
})

export const currentEventIdState = atom<null | string>({
  key: 'currentEventIdState',
  default: null
})

export const eventSearchOptionsState = atom<t.EventSearchOptions & {
  page: number
  pageSize: number
}>({
  key: 'eventSearchOptionsState',
  default: {
    page: 1,
    pageSize: 25
  }
})

export const eventSearchUrlQuerySelector = selector<string>({
  key: 'eventSearchUrlQuerySelector',
  get: ({ get }) => {
    const options = get(eventSearchOptionsState)
    return ComplexQueryString.serialize({
      ...options,
      // If the page is at default, no need to add it to the query
      // string the API will default to 1/25
      page: options.page === 1 ? undefined : options.page,
      pageSize: options.pageSize === 25 ? undefined : options.pageSize,
      // Flatten tags to a ; seperated string if they exist
      tags: options.tags?.join(';') ?? undefined
    })
  }
})

/**
 * Based on the query string (which should be a stable hash-like
 * string based on all user input filter/sort/page data) generate
 * a stable uuid. We'll use this to lookup previous API queries
 * without making the request again.
 */
export const eventSearchHashSelector = selector<string>({
  key: 'eventSearchHashSelector',
  get: ({ get }) => {
    return uuid.v5(get(eventSearchUrlQuerySelector), uuid.v5.DNS)
  }
})

export const currentEventSelector = selector<t.Event | null>({
  key: 'currentEventSelector',
  get: ({ get }) => {
    const eventId = get(currentEventIdState)
    if (!eventId) return null
    return get(eventsState(eventId)) ?? null
  }
})
