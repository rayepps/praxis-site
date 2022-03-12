import _ from 'radash'
import api from '@exobase/client-builder'
import * as t from './types'
import config from './config'

const createApi = () => {
  const endpoint = api(config.apiUrl as string)
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
      })
    }
  }
}

export default createApi()
