import _ from 'radash'
import api from '@exobase/client-builder'
import * as t from './types'
import config from './config'
import type { AxiosRequestConfig } from 'axios'

const appendSkipCacheHeader = (config: AxiosRequestConfig) => {
  if (typeof window === 'undefined') return config
  const skipCache = localStorage.getItem('px.dev-tools.skip-cache') === 'yes'
  if (!skipCache) return config
  return {
    ...config,
    headers: {
      ...config.headers,
      'x-skip-cache': 'yes'
    }
  }
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
        function: 'findById'
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
        function: 'findBySlug'
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
      function: 'recentlyPublished'
    })
    },
    system: {
      listCompanies: endpoint<
        {},
        {
          companies: t.Company[]
        }
      >({
        module: 'system',
        function: 'listCompanies'
      }),
      getSystemMetadata: endpoint<
        {},
        {
          companies: t.Company[]
        }
      >({
        module: 'system',
        function: 'metadata'
      }),
      listTags: endpoint<
        {},
        {
          tags: t.Tag[]
        }
      >({
        module: 'system',
        function: 'listTags'
      })
    },
    marketing: {
      addContact: endpoint<{ email: string; source: string }, {}>({
        module: 'marketing',
        function: 'addContact'
      }),
      subscribe: endpoint<{ email: string; }, {
        contact: {
          id: string
          email: string
        }
      }>({
        module: 'marketing',
        function: 'subscribe'
      }),
      unsubscribe: endpoint<{ id: string; }, {
        contact: {
          id: string
          email: string
        }
      }>({
        module: 'marketing',
        function: 'unsubscribe'
      })
    }
  }
}

export default createApi()
