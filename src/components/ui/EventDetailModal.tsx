import Modal from 'src/components/ui/Modal'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { currentEventIdState, currentEventSelector } from 'src/state/events'
import _ from 'radash'
import formatDate from 'date-fns/format'
import * as t from 'src/types'
import HorizontalGallery from 'src/components/ui/HorizontalGallery'
import {
  HiX,
  HiOutlineLink,
  HiArrowNarrowRight,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineCurrencyDollar
} from 'react-icons/hi'
import Markdown from './Markdown'
import { useState } from 'react'
import CopyToClipboard from './CopyToClipboard'

export default function EventDetailModal({ event, onClose }: { event: t.Event | null; onClose?: () => void }) {
  if (!event) return null

  const [copyText, setCopyText] = useState('copy link')

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
    setCopyText('copied!')
    const base = (() => {
      if (window.location.href.includes('localhost')) return 'http://localhost:3009'
      return 'https://praxisco.us'
    })()
    navigator.clipboard.writeText(`${base}/e/${event.slug}`)
    setTimeout(() => setCopyText('copy link'), 2000)
  }

  const base = (() => {
    if (window.location.href.includes('localhost')) return 'http://localhost:3009'
    return 'https://praxisco.us'
  })()
  const link = `${base}/e/${event.slug}`

  return (
    <Modal open onClose={closeModal}>
      <div>
        <div className="flex flex-row items-center justify-end">
          <CopyToClipboard content={link} name='link' />
          <button onClick={closeModal} className="group hover:bg-black p-2 rounded">
            <HiX size={23} className="group-hover:text-white" />
          </button>
        </div>
        <div className="mb-2">
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
        <div className="my-2 relative">
          {training.description.markdown ? (
            <Markdown markdown={training.description.markdown} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: training.description.html }} />
          )}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white h-20"></div>
        </div>
        <div className="my-6 flex flex-col md:flex-row rounded-lg bg-gray-50 items-center p-6">
          <div className="grow pr-6">
            <h6 className="text-2xl text-center md:text-left font-bold pb-2 md:pb-0">More Information</h6>
            <p className="text-lg text-center md:text-left font-medium max-w-prose">
              Read the rest at {event.training.company.name}. Course instructors, directions, required
              equipment, and other details await.
            </p>
          </div>
          <a
            href={
              event.externalLink ?? event.directLink ?? training.company?.externalLink ?? training.company?.directLink
            }
            target="_blank"
            className="p-2 bg-black flex flex-row text-center items-center text-white w-full md:w-auto mt-4 md:mt-0 rounded font-bold whitespace-nowrap"
          >
            <span>Go Now</span>
            <HiArrowNarrowRight className="ml-2" />
          </a>
        </div>
      </div>
    </Modal>
  )
}
