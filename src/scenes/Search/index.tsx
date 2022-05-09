import _ from 'radash'
import { useState, useEffect, useRef } from 'react'
import Recoil, { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil'
import api from 'src/api'
import * as t from '../../types'
import { useQuery } from '../../hooks'
import SearchForm from './SearchForm'
import EventGrid from 'src/components/ui/EventGrid'
import SummaryBar from './SummaryBar'
import PaginationBar from './PaginationBar'
import EventDetailModal from 'src/components/ui/EventDetailModal'
import { useSearchEvents } from 'src/hooks/useSearchEvents'
import {
  currentEventIdState,
  currentEventSelector,
  currentTrainingIdState,
  currentTrainingSelector,
  eventSearchHashSelector,
  eventSearchOptionsState,
  eventSearchStateSelector,
  eventsState,
  trainingsState
} from 'src/state/events'
import SuggestedAppointmentOnlyTrainings from './SuggestedAppointmentOnlyTrainings'
import useUrlStateSync from 'src/hooks/useUrlStateSync'
import TrainingDetailModal from 'src/components/ui/TrainingDetailModal'
import useAnalytics from 'src/hooks/useAnalytics'
import np from 'nprogress'

import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { HiX } from 'react-icons/hi'

export default function SearchScene({
  title,
  thumbnail,
  info,
  filters,
  overrides
}: {
  title?: string
  thumbnail?: string
  info?: string
  filters?: t.EventSearchFilterFields[]
  overrides?: Partial<t.EventSearchOptions>
}) {
  useUrlStateSync()

  const analytics = useAnalytics()
  const hash = useRecoilValue(eventSearchHashSelector)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const { page } = useRecoilValue(eventSearchOptionsState)
  const searchEvents = useSearchEvents({
    onStart: () => np.start(),
    onDone: () => np.done()
  })
  const listCompanies = useQuery('companies', api.companies.list)
  const listTags = useQuery('tags', api.tags.list)
  const listStates = useQuery('states', api.locations.listStateEventCounts)
  const searchResults = Recoil.useRecoilValue(eventSearchStateSelector)
  const setCurrentEventId = useSetRecoilState(currentEventIdState)
  const setCurrentTrainingId = useSetRecoilState(currentTrainingIdState)
  const currentlySelectedEvent = useRecoilValue(currentEventSelector)
  const currentlySelectedTraining = useRecoilValue(currentTrainingSelector)

  const handleEventClick = useRecoilCallback(({ set, snapshot }) => (e: t.Event) => {
    set(currentEventIdState, e.id)
    snapshot.getPromise(eventsState(e.id)).then((event: t.Event | null) => {
      if (!event) return
      analytics?.track_event_viewed(event)
    })
  })

  const handleTrainingClick = useRecoilCallback(({ set, snapshot }) => (t: t.Training) => {
    set(currentTrainingIdState, t.id)
    snapshot.getPromise(trainingsState(t.id)).then((training: t.Training | null) => {
      if (!training) return
      analytics?.track_training_viewed(training)
    })
  })

  const closeModal = () => {
    setCurrentEventId(null)
    setCurrentTrainingId(null)
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
    listStates.query()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  const companies = listCompanies.data?.companies ?? []
  const tags = listTags.data?.tags ?? []
  const states = listStates.data?.counts ?? ({} as Record<t.StateAbbreviation, number>)

  return (
    <>
      <TrainingDetailModal training={currentlySelectedTraining} onClose={closeModal} />
      <EventDetailModal event={currentlySelectedEvent} onClose={closeModal} />
      <div className="w-screen flex flex-row justify-center">
        <div className="items-start flex max-w-screen-3xl grow flex-row">
          <div className="md:px-4 md:pb-4 rounded-xl max-w-xs">
            <SceneInfo title={title} info={info} thumbnail={thumbnail} className="hidden md:block" />
            <div
              className={`hidden md:block bg-white p-4 pt-8 md:p-0 md:pt-0 ${
                filtersOpen ? '!block fixed top-0 left-0 w-screen h-screen z-[9]' : ''
              }`}
            >
              <SearchForm
                states={states}
                companies={companies}
                tags={tags}
                filters={filters}
                overrides={overrides}
              />
              <button className={`p-2 top-2 right-2 fixed hidden ${filtersOpen ? '!block' : ''}`} onClick={_.partial(setFiltersOpen, false)}>
                <HiX size={24} className={`text-slate-800`} />
              </button>
            </div>
          </div>
          <div className="grow px-4 flex flex-col w-full">
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
            <div className="mt-4 bg-gray-50 rounded-xl p-4 md:p-10">
              <SuggestedAppointmentOnlyTrainings onTrainingClick={handleTrainingClick} />
            </div>
            <PaginationBar />
          </div>
        </div>
      </div>
    </>
  )
}

const SceneInfo = ({
  thumbnail,
  title,
  info,
  className
}: {
  thumbnail?: string
  title?: string
  info?: string
  className?: string
}) => {
  return (
    <div className={className}>
      {thumbnail && (
        <div className="flex flex-row">
          <img src={thumbnail} className="w-32 h-auto mb-4 rounded" />
        </div>
      )}
      <div className="bg-slate-50 rounded-xl p-4 mb-6">
        {title && <h1 className="font-bold text-3xl mb-2">{title}</h1>}
        {!title && (
          <h1 className="font-bold text-3xl mb-2">
            Tactical
            <br />
            Survival
            <br />
            &amp; Medical
            <br />
            Training
          </h1>
        )}
        <p className="text-sm max-w-prose">
          {info ??
            `
            Search the best tactical, medical, and survival training courses in the USA. New trainings and events
            added every week.
          `}
        </p>
      </div>
    </div>
  )
}
