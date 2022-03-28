import Modal from 'src/components/ui/Modal'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { currentEventIdState, currentEventSelector } from 'src/state/events'
import _ from 'radash'
import formatDate from 'date-fns/format'
import * as t from 'src/types'
import HorizontalGallery from 'src/components/ui/HorizontalGallery'
import { HiX, HiOutlineLink, HiArrowNarrowRight, HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineCurrencyDollar } from 'react-icons/hi'

export default function EventDetailModal({ event, onClose }: { event: t.Event | null; onClose?: () => void }) {
  if (!event) return null

  const closeModal = () => {
    onClose?.()
  }

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

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(`https://praxisco.us/e/${event.slug}`)
  }

  return (
    <Modal open onClose={closeModal}>
      <div>
        <div className="flex flex-row items-start mb-2">
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
          <div className="flex flex-row items-center">
            {/* <button onClick={copyLinkToClipboard} className="mr-2">
              <HiOutlineLink size={22} className="text-black" />
            </button> */}
            <button onClick={closeModal}>
              <HiX size={24} className="text-black" />
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between bg-gray-50 mb-4 p-4 rounded-md">
          <div className="flex flex-row items-center pb-2 md:pb-0">
            <HiOutlineCurrencyDollar size={24} className="text-slate-600 mr-2" />{' '}
            <span className="text-slate-600 text-md">{event.training.displayPrice}</span>
          </div>
          <div className="flex flex-row items-center  pb-2 md:pb-0">
            <HiOutlineLocationMarker size={24} className="text-slate-600 mr-2" />{' '}
            <span className="text-slate-600 text-md">
              {event.city}, {event.state}
            </span>
          </div>
          <div className="flex flex-row items-center">
            <HiOutlineCalendar size={24} className="text-slate-600 mr-2" />{' '}
            <span className="text-slate-600 text-md">{format(start)}</span>
          </div>
        </div>
        <HorizontalGallery images={images.map(img => img.url)} />
        <div className="my-6 flex flex-col md:flex-row rounded-lg bg-gray-50 items-center p-6">
          <div className="grow pr-6">
            <h6 className="text-2xl text-center md:text-left font-bold pb-2 md:pb-0">Theory vs. Action</h6>
            <p className="text-lg text-center md:text-left font-medium max-w-prose">
              The moment where your plans and ideas become action. Do more than think about training. Train.
            </p>
          </div>
          <a
            href={
              event.externalLink ?? event.directLink ?? training.company?.externalLink ?? training.company?.directLink
            }
            target="_blank"
            className="p-2 bg-black text-center text-white w-full md:w-auto mt-4 md:mt-0 rounded font-bold whitespace-nowrap"
          >
            Sign Up Now
          </a>
        </div>
        <div className="my-2">
          <div dangerouslySetInnerHTML={{ __html: training.description.html }} />
        </div>
        <div className="flex flex-row justify-end">
          <a
            href={
              event.externalLink ?? event.directLink ?? training.company?.externalLink ?? training.company?.directLink
            }
            target="_blank"
            className="p-2 bg-black flex flex-row text-center items-center text-white w-full md:w-auto mt-4 md:mt-0 rounded font-bold whitespace-nowrap"
          >
            <span>More Information</span>
            <HiArrowNarrowRight className="ml-2" />
          </a>
        </div>
      </div>
    </Modal>
  )
}
