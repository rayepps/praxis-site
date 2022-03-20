import { useState, useEffect, useRef } from 'react'
import URI from 'urijs'
import parseUrl from 'url-parse'
import Recoil, { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import ComplexQueryString from '../../../util/ComplexQueryString'
import api from 'src/api'
import { Stack, Split, Axis } from '../../Layout'
import * as t from '../../../types'
import { useFetch, useQuery } from '../../../hooks'

import SearchForm from './SearchForm'
import EventGrid from 'src/components/ui/EventGrid'
import SummaryBar from './SummaryBar'
import PaginationBar from './PaginationBar'
import EventDetailModal from 'src/components/ui/EventDetailModal'
import { useSearchEvents } from 'src/hooks/useSearchEvents'
import {
  currentEventIdState,
  currentEventSelector,
  eventSearchHashSelector,
  eventSearchOptionsState,
  eventSearchState,
  eventSearchStateSelector,
  eventsState
} from 'src/state/events'
import useUrlStateSync from 'src/hooks/useUrlStateSync'
import useAnalytics from 'src/hooks/useAnalytics'
import np from 'nprogress'

import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file

export default function SearchScene() {
  useUrlStateSync()

  const analytics = useAnalytics()
  const topOfListRef = useRef<HTMLDivElement>(null)
  const hash = useRecoilValue(eventSearchHashSelector)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const { page } = useRecoilValue(eventSearchOptionsState)
  const searchEvents = useSearchEvents({
    onStart: () => np.start(),
    onDone: () => np.done()
  })
  const listCompanies = useQuery('companies', api.system.listCompanies)
  const listTags = useQuery('tags', api.system.listTags)
  const searchResults = Recoil.useRecoilValue(eventSearchStateSelector)
  const setCurrentEventId = useSetRecoilState(currentEventIdState)
  const currentlySelectedEvent = useRecoilValue(currentEventSelector)

  const handleEventClick = useRecoilCallback(({ set, snapshot }) => (e: t.Event) => {
    set(currentEventIdState, e.id)
    snapshot.getPromise(eventsState(e.id)).then((event: t.Event | null) => {
      if (!event) return
      analytics?.track_event_viewed(event)
    })
  })

  const closeModal = () => {
    setCurrentEventId(null)
  }

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen)
  }

  useEffect(() => {
    searchEvents.fetch()
  }, [hash])

  useEffect(() => {
    listCompanies.query()
    listTags.query()
  }, [])

  useEffect(() => {
    topOfListRef.current?.scrollIntoView()
  }, [page])

  const companies = listCompanies.data?.companies ?? []
  const tags = listTags.data?.tags ?? []

  return (
    <>
      <div
        className={`fixed md:!hidden ${
          filtersOpen ? 'flex' : 'hidden'
        } top-0 left-0 w-screen h-screen bg-black-opaque z-[9] flex-row`}
      >
        <div className="max-w-screen-sm h-screen bg-white p-6">
          <SearchForm companies={companies} tags={tags} />
        </div>
        <div className="grow h-screen" onClick={() => setFiltersOpen(false)}></div>
      </div>
      <EventDetailModal event={currentlySelectedEvent} onClose={closeModal} />
      <div className="w-screen flex flex-row justify-center">
        <div className="items-start md:pl-4 flex max-w-screen-3xl grow flex-row">
          <div className="hidden md:block p-4 rounded-xl">
            <SearchForm companies={companies} tags={tags} />
          </div>
          <div ref={topOfListRef} className="grow px-4 flex flex-col w-full">
            <SummaryBar onToggleFilters={toggleFilters} />
            <div className="py-4">
              <EventGrid
                events={searchResults ?? []}
                loading={searchEvents.loading}
                onEventClick={handleEventClick}
                fallback={
                  <div className="grow min-h-[70vh] flex flex-row items-center justify-center">
                    <div className="grow max-w-md bg-slate-100 rounded-lg p-6">
                      <h3 className="text-2xl font-bold">No Results</h3>
                      <p className="text-base">
                        We don't have any trainings that match your search. Are we missing something? Let us know at{' '}
                        <a className="font-bold text-yellow-300" href="mailto:ray@praxisco.us">
                          ray@praxisco.us
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                }
              />
            </div>
            <PaginationBar />
          </div>
        </div>
      </div>
    </>
  )
}
