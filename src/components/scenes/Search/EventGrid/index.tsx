import _ from 'radash'
import * as t from 'src/types'
import EventCard from '../EventCard'
import Skeleton from 'react-loading-skeleton'
import { currentEventIdState, eventSearchState } from 'src/state/events'
import Recoil from 'recoil'

export default function EventGrid({
  loading = false,
  onEventClick
}: {
  loading?: boolean
  onEventClick?: (eventId: string) => void
}) {
  const searchResults = Recoil.useRecoilValue(eventSearchState)
  const handleEventClick = (eventId: string) => () => {
    onEventClick?.(eventId)
  }
  if (!loading && searchResults.results.length === 0) {
    return (
      <div className="grow min-h-[70vh] flex flex-row items-center justify-center">
        <div className="grow max-w-md bg-slate-100 rounded-lg p-6">
          <h3 className="text-2xl font-bold">No Results</h3>
          <p className="text-base">
            We don't have any trainings that match your search. Are we missing something? Let us know at <a className="font-bold text-yellow-300" href="mailto:ray@praxisco.us">ray@praxisco.us</a>.
          </p>
        </div>
      </div>
    )
  }
  return (
    <div
      className="grow grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 py-4"
    >
      {!loading && searchResults.results.map(eventId => (
        <EventCard key={eventId} eventId={eventId} onClick={handleEventClick(eventId)} />
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