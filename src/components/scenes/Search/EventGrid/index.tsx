import _ from 'radash'
import * as t from 'src/types'
import EventCard from '../EventCard'
import Skeleton from 'react-loading-skeleton'


export default function EventGrid({
  events,
  loading = false
}: {
  events: t.Event[]
  loading?: boolean
}) {
  return (
    <div
      className="grow grid grid-cols-4 gap-4 py-4"
    >
      {!loading && events.filter(x => !!x.slug).map(event => (
        <EventCard key={event.slug} event={event} />
      ))}
      {loading && [0, 1, 2, 3, 4].map((i) => (
        <div key={i}>
          <div className="pb-8">
            <Skeleton
              width='100%'
              height={170}
            />
          </div>
          <div className="pb-8">
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