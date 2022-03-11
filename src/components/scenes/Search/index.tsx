import { useState, useEffect, useRef } from 'react'
import parseUrl from 'url-parse'
import Recoil, { useSetRecoilState } from 'recoil'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { currentEventState, searchState } from '../../../state/search'
import ComplexQueryString from '../../../util/ComplexQueryString'
import api from 'src/api'
import { Stack, Split, Axis } from '../../Layout'
import * as t from '../../../types'
import { useFetch } from '../../../hooks'
import { queryState } from '../../../state/search'

import SearchForm from './SearchForm'
import EventGrid from './EventGrid'
import SummaryBar from './SummaryBar'
import PaginationBar from './PaginationBar'
import EventDetailModal from './EventDetailModal'

import 'react-modern-calendar-datepicker/lib/DatePicker.css'

function UrlStateSync() {
  const [search, setSearch] = Recoil.useRecoilState(searchState)

  // On first render, check if there is
  // a value in the url, parse it, and
  // set the state to it
  useEffect(() => {
    const qs = window.location.search
    if (!qs) return
    const state = ComplexQueryString.deserialize(qs)
    setSearch(state as any)
  }, [])

  // Anytime the state changes, update
  // the url in place
  useEffect(() => {
    const url = parseUrl(window.location.href)
    const state = ComplexQueryString.serialize(search)
    const newUrl = url.set('query', state)
    window.history.pushState({}, '', newUrl.toString())
  }, [search])
  return null
}

export default function SearchScene() {
  return (
    <Recoil.RecoilRoot>
      <div className="min-h-screen">
        <UrlStateSync />
        <SearchSceneContent />
      </div>
    </Recoil.RecoilRoot>
  )
}

export function SearchSceneContent() {
  const topOfListRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useRecoilState(queryState)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const searchEventsRequest = useFetch(api.events.search)
  const listCompaniesRequest = useFetch(api.system.listCompanies)
  const listTagsRequest = useFetch(api.system.listTags)

  const setFilters = (newFilters: t.SearchFilters) =>
    setQuery({
      ...query,
      ...newFilters
    })

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen)
  }

  const searchEvents = async () => {
    const { error } = await searchEventsRequest.fetch(query)
    if (error) {
      // TODO: Show user
      console.error(error)
      return
    }
  }

  const listCompanies = async () => {
    const { error } = await listCompaniesRequest.fetch({})
    if (error) {
      // TODO: Show user
      console.error(error)
      return
    }
  }

  const listTags = async () => {
    const { error } = await listTagsRequest.fetch({})
    if (error) {
      // TODO: Show user
      console.error(error)
      return
    }
  }

  const updateOrder = (orderBy: t.OrderBy, orderAs: t.OrderAs) =>
    setQuery({
      ...query,
      orderBy,
      orderAs
    })

  const updatePage = (newPage: number) => {
    setQuery({
      ...query,
      page: newPage
    })
    topOfListRef.current?.scrollIntoView()
  }

  useEffect(() => {
    searchEvents()
  }, [query.hash])

  useEffect(() => {
    listCompanies()
    listTags()
  }, [])

  const events = searchEventsRequest.data?.events ?? []
  const total = searchEventsRequest.data?.total ?? 0
  const companies = listCompaniesRequest.data?.companies ?? []
  const tags = listTagsRequest.data?.tags ?? []

  return (
    <>
      <EventDetailModal />
      <div className="items-start md:pl-4 flex flex-row">
        <div className="hidden md:block p-4 rounded-xl bg-gray-50">
          <SearchForm filters={query} companies={companies} tags={tags} onFiltersChange={setFilters} />
        </div>
        <div
          className={`fixed md:!hidden ${
            filtersOpen ? 'flex' : 'hidden'
          } top-0 left-0 w-screen h-screen bg-black-opaque z-40 flex-row`}
        >
          <div className={`max-w-screen-sm h-screen bg-white z-50 p-6`}>
            <SearchForm filters={query} companies={companies} tags={tags} onFiltersChange={setFilters} />
          </div>
          <div className="grow h-screen" onClick={() => setFiltersOpen(false)}></div>
        </div>

        <Stack ref={topOfListRef} className="grow px-4">
          <SummaryBar
            total={total}
            pageNumber={query.page}
            pageSize={query.pageSize}
            orderBy={query.orderBy}
            orderAs={query.orderAs}
            onOrderChange={updateOrder}
            onToggleFilters={toggleFilters}
          />
          <EventGrid loading={searchEventsRequest.loading} events={events} />
          <PaginationBar total={total} page={query.page} pageSize={query.pageSize} onPageChange={updatePage} />
        </Stack>
      </div>
    </>
  )
}
