import formatDate from 'date-fns/format'
import differenceInDays from 'date-fns/differenceInDays'
import { HiOutlineLocationMarker, HiOutlineCalendar } from 'react-icons/hi'
import * as t from 'src/types'

export default function EventCard({ event, onClick }: { event: t.Event; onClick?: () => void }) {
  if (!event) return null

  const start = event.startDate ? new Date(event.startDate) : null
  // const end = event.endDate ? new Date(event.endDate) : null

  const format = (date: Date | null) => {
    if (!date) return ''
    return formatDate(date, 'MMM do')
  }

  const isNew = (() => {
    if (!event.createdAt) return false
    const daysAgo = differenceInDays(new Date(), new Date(event.createdAt))
    return daysAgo < 5
  })()

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
    <div className="drop-shadow-lg flex flex-col">
      <div className="relative h-56 w-full hover:cursor-pointer">
        <img onClick={onClick} src={thumbnailUrl} className="object-cover h-full w-full rounded-t-lg" />
        {!!event.training.price && (
          <div className="rounded px-1 left-3 top-3 absolute bg-white-opaque">
            <span className="font-bold">{event.training.displayPrice}</span>
          </div>
        )}
        {event.soldOut === true && (
          <div className="rounded px-1 right-3 top-3 absolute bg-red-600">
            <span className="text-xs font-black text-white uppercase">sold out</span>
          </div>
        )}
        {!event.soldOut && (event.recentlyAdded === true || isNew) && (
          <div className="rounded px-1 right-3 top-3 absolute bg-green-600-opaque">
            <span className="text-xs font-black text-white uppercase">new</span>
          </div>
        )}
      </div>
      <div className="p-3 grow bg-white flex flex-col rounded-b-md">
        <div className="grow flex flex-row">
          <div className="grow">
            <h4 className="text-xl pr-2 font-bold hover:underline hover:cursor-pointer" onClick={onClick}>{event.training.name}</h4>
            <span className="text-sm font-semibold mb-2 text-gray-600 inline-block">{event.training.company.name}</span>
            <div className="">
              {event.training.tags.map(tag => (
                <div key={tag.slug} className="px-2 bg-gray-200 rounded inline-block mr-2 mb-2">
                  <span className="font-bold text-xs text-slate-500">{tag.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* <img src={event.training.company?.thumbnail?.url} className="object-cover h-10 w-10 rounded" /> */}
        </div>
        <div className="flex flex-row">
          <div className="grow">
            <div className="flex flex-row items-center">
              <HiOutlineLocationMarker size={16} className="text-slate-400 mr-2" />{' '}
              <span className="text-slate-400">
                {event.city}, {event.state}
              </span>
            </div>
            <div className="flex flex-row items-center">
              <HiOutlineCalendar size={16} className="text-slate-400 mr-2" />{' '}
              <span className="text-slate-400">{format(start)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
