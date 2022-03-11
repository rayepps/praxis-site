import _ from 'radash'
import formatDate from 'date-fns/format'
import * as t from 'src/types'
import { Center, Split } from '../Layout'
import HorizontalGallery from 'src/components/ui/HorizontalGallery'
import { HiX, HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineCurrencyDollar } from 'react-icons/hi'

export default function EventDetailScene({ event, onClose }: { event: t.Event; onClose?: () => void }) {
  const { training } = event

  const start = event.startDate ? new Date(event.startDate) : null
  // const end = event.endDate ? new Date(event.endDate) : null

  const format = (date: Date | null) => {
    if (!date) return ''
    return formatDate(date, 'MMM do')
  }

  const images = [
    ..._.unique(
      [...event.training.gallery, ...event.images].filter(img => img.url !== event.training.company.thumbnail?.url),
      img => img.url
    ),
    event.training.company.thumbnail
  ].filter(x => !!x)

  return (
    <div>
      <Split className="items-start mb-2">
        <div className="mr-2 grow">
          <h4 className="text-3xl font-bold block">{event.training.name}</h4>
          <span className="text-sm mb-2 text-gray-400 block">{event.training.company.name}</span>
          <div className="">
            {event.training.tags?.map(tag => (
              <div key={tag.slug} className="px-2 bg-gray-200 rounded inline-block mr-2 mb-2">
                <span className="font-bold text-xs text-slate-500">{tag.name}</span>
              </div>
            ))}
          </div>
        </div>
        <button onClick={onClose}>
          <HiX size={24} className="text-black" />
        </button>
      </Split>
      <div className="flex justify-between bg-gray-50 mb-4 p-4 rounded-md">
        <Split className="items-center">
          <HiOutlineCurrencyDollar size={24} className="text-slate-600 mr-2" />{' '}
          <span className="text-slate-600 text-md">{event.training.displayPrice}</span>
        </Split>
        <Split className="items-center">
          <HiOutlineLocationMarker size={24} className="text-slate-600 mr-2" />{' '}
          <span className="text-slate-600 text-md">
            {event.city}, {event.state}
          </span>
        </Split>
        <Split className="items-center">
          <HiOutlineCalendar size={24} className="text-slate-600 mr-2" />{' '}
          <span className="text-slate-600 text-md">{format(start)}</span>
        </Split>
      </div>
      <HorizontalGallery images={images.map(img => img.url)} />
      <Split className="my-6 rounded-lg bg-gray-50 items-center p-6">
        <div className="grow pr-6">
          <h6 className="text-xl font-bold">Theory vs. Action</h6>
          <p className="text-lg font-medium max-w-prose">
            Welcome to the Praxis. The moment where your thoughts, plans, and ideas become action. Do more than think
            about training. Train.
          </p>
        </div>
        <a
          href={
            event.externalLink ?? event.directLink ?? training.company?.externalLink ?? training.company?.directLink
          }
          target="_blank"
          className="p-2 bg-black text-white rounded font-bold whitespace-nowrap"
        >
          Sign Up Now
        </a>
      </Split>
      <div className="mt-2">
        <div dangerouslySetInnerHTML={{ __html: training.description.html }} />
      </div>
    </div>
  )
}
