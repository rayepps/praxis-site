import * as t from 'src/types'
import { Stack, Split } from 'src/components/Layout'
import formatDate from 'date-fns/format'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { eventsState } from 'src/state/events'

export default function EventCard({ eventId, onClick }: { eventId: string; onClick?: () => void }) {
  const event = useRecoilValue(eventsState(eventId))
  if (!event) return null

  const start = event.startDate ? new Date(event.startDate) : null
  // const end = event.endDate ? new Date(event.endDate) : null

  const format = (date: Date | null) => {
    if (!date) return ''
    return formatDate(date, 'MMM do')
  }

  const thumbnailUrl = (() => {
    if (event.images?.length > 0) {
      return event.images[0].url
    }
    if (event.training.thumbnail) {
      return event.training.thumbnail.url
    }
    if (event.training.company?.thumbnail) {
      return event.training.company.thumbnail.url
    }
    // TODO: Return a default image that won't
    // error or show blank on UI for best UX
    return ''
  })()

  return (
    <Stack className="bg-gray-50 rounded-b" onClick={onClick}>
      <div
        className="relative rounded-t bg-cover bg-no-repeat bg-center h-56 w-full hover:cursor-pointer"
        style={{
          backgroundImage: `url(${thumbnailUrl})`
        }}
      >
        <div className="rounded py-1 px-2 left-3 top-3 absolute bg-white-opaque">
          <span className="font-bold">{event.training.displayPrice}</span>
        </div>
        {event.soldOut === true && (
          <div className="rounded py-1 px-2 right-3 top-3 absolute bg-red-600">
            <span className="text-xs font-black text-white uppercase">sold out</span>
          </div>
        )}
      </div>
      <Stack className="p-3 grow">
        <Split className="grow">
          <div className="grow">
            <h4 className="text-lg font-bold">{event.training.name}</h4>
            <span className="text-sm mb-2 text-gray-400 inline-block">{event.training.company.name}</span>
            <div className="">
              {event.training.tags.map(tag => (
                <div key={tag.slug} className="px-2 bg-gray-200 rounded inline-block mr-2 mb-2">
                  <span className="font-bold text-xs text-slate-500">{tag.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div
              className="rounded bg-cover bg-no-repeat bg-center h-10 w-10"
              style={{
                backgroundImage: `url(${event.training.company?.thumbnail?.url})`
              }}
            />
          </div>
        </Split>
        <Split>
          <div className="grow">
            <Split className="items-center">
              <HiOutlineLocationMarker size={16} className="text-slate-400 mr-2" />{' '}
              <span className="text-slate-400">
                {event.city}, {event.state}
              </span>
            </Split>
            <Split className="items-center">
              <HiOutlineCalendar size={16} className="text-slate-400 mr-2" />{' '}
              <span className="text-slate-400">{format(start)}</span>
            </Split>
          </div>
        </Split>
      </Stack>
    </Stack>
  )
}
