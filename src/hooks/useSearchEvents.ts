import { useRecoilCallback, useSetRecoilState, useRecoilValue } from 'recoil'
import api from 'src/api'
import { useFetch, useQuery } from 'src/hooks'
import * as t from 'src/types'
import { eventSearchHashSelector, eventSearchOptionsState, eventSearchState, eventsState } from '../state/events'

/**
 * When the page loads we sync any query string params for
 * search options to the recoil state. This happens in a
 * useEffect so we get one render with the initial default
 * search config. If there are any url params and the state
 * gets updated we will end up sending two request quickly.
 * Enter, race condition. With caching and differences in
 * result sizes the first request can sometimes come back
 * second. The code below (namely `currentHash`) checks that
 * the hash that sent the request is the same as the has
 * currently in state. We always update all events because
 * why waste good data.
 */
export const useSearchEvents = () => {
  const hash = useRecoilValue(eventSearchHashSelector)
  const searchEvents = useQuery(`search.${hash}`, api.events.search)
  const options = useRecoilValue(eventSearchOptionsState)
  const setSearchResults = useRecoilCallback(({ set, snapshot }) => async (data: { total: number; events: t.Event[] }) => {
    for (const event of data.events) {
      set(eventsState(event.id), event)
    }
    const currentHash = await snapshot.getPromise(eventSearchHashSelector)
    if (currentHash !== hash) {
      return
    }
    set(eventSearchState, {
      total: data.total,
      results: data.events.map(e => e.id)
    })
  })

  const fetchAndStore = async () => {
    const { error, data } = await searchEvents.query(options)
    if (error) {
      return { error, data }
    }
    await setSearchResults(data)
    return { error, data }
  }

  return {
    ...searchEvents,
    fetch: fetchAndStore
  }
}
