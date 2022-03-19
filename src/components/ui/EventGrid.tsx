import _ from 'radash'
import { ReactNode } from 'react'
import * as t from 'src/types'
import EventCard from './EventCard'
import Skeleton from 'react-loading-skeleton'

export default function EventGrid({
  events,
  loading = false,
  fallback = null,
  onEventClick
}: {
  events: t.Event[]
  fallback?: ReactNode | null
  loading?: boolean
  onEventClick?: (event: t.Event) => void
}) {
  const handleEventClick = (event: t.Event) => () => {
    onEventClick?.(event)
  }
  if (!loading && events.length === 0) {
    return <>{fallback}</>
  }
  return (
    <div
      className="grow grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
    >
      {!loading && events.map((event) => (
        <EventCard key={event.id} event={event} onClick={handleEventClick(event)} />
      ))}
      {loading && [0, 1, 2, 3, 4].map((i) => (
        <div key={i}>
          <div className="pb-2">
            <Skeleton
              width='100%'
              height={170}
            />
          </div>
          <div className="pb-2">
            <Skeleton
              width='40%'
              height={24}
            />
          </div>
          <div>
            <Skeleton
              width='67%'
              height={24}
            />
          </div>
        </div>
      ))}
    </div>
  )
}