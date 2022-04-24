import _ from 'radash'
import api from '@exobase/client-builder'
import * as t from './types'
import config from './config'
import type { AxiosRequestConfig } from 'axios'
import storage from 'src/local-storage'

const skipCache = (config: AxiosRequestConfig): AxiosRequestConfig => {
  return {
    ...config,
    headers: {
      ...config.headers,
      'x-skip-cache': 'yes'
    }
  }
}

const appendSkipCacheHeader = (config: AxiosRequestConfig) => {
  if (typeof window === 'undefined') return config
  if (!storage.skipCache.get()) return config
  return skipCache(config)
}

const createApi = () => {
  const endpoint = api(config.apiUrl as string, appendSkipCacheHeader)
  return {
    events: {
      search: endpoint<
        t.EventSearchOptions,
        {
          events: t.Event[]
          total: number
        }
      >({
        module: 'events',
        function: 'search'
      }),
      findById: endpoint<
        {
          eventId: string
        },
        {
          event: t.Event
        }
      >({
        module: 'events',
        function: 'find-by-id'
      }),
      findBySlug: endpoint<
        {
          slug: string
        },
        {
          event: t.Event
        }
      >({
        module: 'events',
        function: 'find-by-slug'
      }),
      recentlyPublished: endpoint<
        {
          limit: number
        },
        {
          events: t.Event[]
        }
      >({
        module: 'events',
        function: 'recently-published'
      })
    },
    companies: {
      list: endpoint<
        {},
        {
          companies: t.Company[]
        }
      >({
        module: 'companies',
        function: 'list'
      })
    },
    tags: {
      list: endpoint<
        {},
        {
          tags: t.Tag[]
        }
      >({
        module: 'tags',
        function: 'list'
      })
    },
    marketing: {
      addContact: endpoint<
        {
          email: string
          source:
            | 'site.partner.form'
            | 'site.contact.form'
            | 'site.subscribe.popup'
            | `site.new-events-in-state.${t.StateAbbreviation}`
        },
        { contact: t.Contact }
      >({
        module: 'marketing',
        function: 'add-contact'
      }),
      unsubscribe: endpoint<
        { id: string },
        {
          contact: {
            id: string
            email: string
          }
        }
      >({
        module: 'marketing',
        function: 'unsubscribe'
      }),
      getActiveGiveaway: endpoint<
        {},
        {
          giveaway: t.Giveaway | null
        }
      >({
        module: 'marketing',
        function: 'get-active-giveaway'
      })
    },
    trainings: {
      search: endpoint<
        t.TrainingSearchOptions,
        {
          trainings: t.Training[]
          total: number
        }
      >({
        module: 'trainings',
        function: 'search'
      }),
      findBySlug: endpoint<
        {
          slug: string
        },
        {
          training: t.Training
        }
      >({
        module: 'trainings',
        function: 'find-by-slug'
      })
    },
    locations: {
      listStateEventCounts: endpoint<
        {},
        {
          counts: Record<t.StateAbbreviation, number>
        }
      >({
        module: 'locations',
        function: 'list-state-event-counts'
      })
    }
  }
}

export default createApi()
