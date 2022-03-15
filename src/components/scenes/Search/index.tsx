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
import EventGrid from './EventGrid'
import SummaryBar from './SummaryBar'
import PaginationBar from './PaginationBar'
import EventDetailModal from './EventDetailModal'
import { useSearchEvents } from 'src/hooks/useSearchEvents'
import { currentEventIdState, eventSearchHashSelector, eventSearchOptionsState, eventsState } from 'src/state/events'
import useUrlStateSync from 'src/hooks/useUrlStateSync'
import useAnalytics from 'src/hooks/useAnalytics'
import np from 'nprogress'

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

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

  const handleEventClick = useRecoilCallback(({ set, snapshot }) => (eventId: string) => {
    set(currentEventIdState, eventId)
    snapshot.getPromise(eventsState(eventId)).then((event: t.Event | null) => {
      if (!event) return
      analytics?.track({
        event: 'event.view',
        type: 'track',
        properties: {
          event_id: event.id,
          event_name: event.name,
          company_id: event.training.company.id,
          company_name: event.training.company.name,
          domain: new URI(event.training.company.directLink).domain(),
          training_id: event.training.id,
          training_name: event.training.name
        }
      })
    })
  })

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
      <EventDetailModal />
      <div className="w-screen flex flex-row justify-center">
        <div className="items-start md:pl-4 flex max-w-screen-3xl grow flex-row">
          <div className="hidden md:block p-4 rounded-xl bg-gray-50">
            <SearchForm companies={companies} tags={tags} />
          </div>
          <div ref={topOfListRef} className="grow px-4 flex flex-col w-full">
            <SummaryBar onToggleFilters={toggleFilters} />
            <EventGrid loading={searchEvents.loading} onEventClick={handleEventClick} />
            <PaginationBar />
          </div>
        </div>
      </div>
    </>
  )
}
