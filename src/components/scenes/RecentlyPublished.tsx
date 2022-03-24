import { useState } from 'react'
import Link from 'next/link'
import {
  HiOutlineLocationMarker,
  HiArrowNarrowRight,
  HiOutlineMailOpen,
  HiOutlineTag,
  HiOutlineBell,
  HiOutlineCash
} from 'react-icons/hi'
import { useFetch } from 'src/hooks'
import api from 'src/api'
import * as t from '../../types'
import EventGrid from '../ui/EventGrid'
import EventDetailModal from 'src/components/ui/EventDetailModal'

export default function RecentlyPublishedScene({ events }: { events: t.Event[] }) {
  const [selectedEvent, setSelectedEvent] = useState<t.Event | null>(null)
  const closeModal = () => {
    setSelectedEvent(null)
  }
  const openModal = (e: t.Event) => {
    setSelectedEvent(e)
  }
  return (
    <>
      <EventDetailModal event={selectedEvent} onClose={closeModal} />
      <div className="w-screen flex flex-row justify-center px-4">
        <div className="items-start flex max-w-screen-3xl grow flex-row">
          <EventGrid events={events.map(e => ({ ...e, recentlyAdded: true }))} onEventClick={openModal} />
        </div>
      </div>
    </>
  )
}
