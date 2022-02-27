import { useEffect } from 'react'
import formatDate from 'date-fns/format'
import * as t from 'src/types'
import theme from 'src/theme'
import { Center, Split } from '../Layout'
import HorizontalGallery from 'src/components/ui/HorizontalGallery'
import { useFetch } from 'src/hooks'

export default function EventDetailScene({ event, onClose }: { event: t.Event; onClose?: () => void }) {
  const { training } = event

  const start = event.startDate ? new Date(event.startDate) : null
  // const end = event.endDate ? new Date(event.endDate) : null

  const format = (date: Date | null) => {
    if (!date) return ''
    return formatDate(date, 'M.d.yyyy')
  }

  return (
    <div>
      <Split className="items-start mb-2">
        <Split className="items-center mr-2 grow">
          <img src={training.company?.thumbnail?.url} className="h-12 w-auto rounded mr-2" />
          <div>
            <h1 className="text-4xl">{training.name}</h1>
            <div>
              <span className="font-bold text-green-400">
                {event.city}, {event.state}
              </span>
              <span className="mx-2 text-yellow-300">|</span>
              <span className="font-bold text-green-400">{training.displayPrice}</span>
              <span className="mx-2 text-yellow-300">|</span>
              <span className="font-bold text-green-400">{format(start)}</span>
            </div>
          </div>
        </Split>
        <a
          href={
            event.externalLink ?? event.directLink ?? training.company?.externalLink ?? training.company?.directLink
          }
          className="p-2 bg-black text-white mr-2"
        >
          sign up
        </a>
        <button onClick={onClose}>close</button>
      </Split>
      <HorizontalGallery images={training.gallery.map(g => g.url)} />
      <div className="mt-2">
        <div dangerouslySetInnerHTML={{ __html: training.description.html }} />
      </div>
    </div>
  )
}
