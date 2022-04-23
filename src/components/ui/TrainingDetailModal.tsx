import Modal from 'src/components/ui/Modal'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { currentEventIdState, currentEventSelector } from 'src/state/events'
import _ from 'radash'
import formatDate from 'date-fns/format'
import * as t from 'src/types'
import HorizontalGallery from 'src/components/ui/HorizontalGallery'
import { HiX, HiOutlineLink, HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineCurrencyDollar } from 'react-icons/hi'
import CopyToClipboard from './CopyToClipboard'

export default function TrainingDetailModal({
  training,
  onClose
}: {
  training: t.Training | null
  onClose?: () => void
}) {
  if (!training) return null

  const closeModal = () => {
    onClose?.()
  }

  const images = [
    ..._.unique(
      training.gallery.filter(img => img.url !== training.company.thumbnail?.url),
      img => img.url
    ),
    training.company.thumbnail
  ].filter(x => !!x)

  const base = (() => {
    if (window.location.href.includes('localhost')) return 'http://localhost:3009'
    return 'https://praxisco.us'
  })()
  const link = `${base}/t/${training.slug}`

  return (
    <Modal open onClose={closeModal}>
      <div>
        <div className="flex flex-row items-start mb-2">
          <div className="mr-2 grow">
            <h4 className="text-3xl font-bold block">{training.name}</h4>
            <span className="text-sm mb-2 text-gray-400 block">{training.company.name}</span>
            <div className="">
              {training.tags?.map(tag => (
                <div key={tag.slug} className="px-2 bg-gray-200 rounded inline-block mr-2 mb-2">
                  <span className="font-bold text-xs text-slate-500">{tag.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row items-center">
            <CopyToClipboard content={link} name='link' />
            <button onClick={closeModal}>
              <HiX size={24} className="text-black" />
            </button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between bg-gray-50 mb-4 p-4 rounded-md">
          <div className="flex flex-row items-center pb-2 md:pb-0">
            <HiOutlineCurrencyDollar size={24} className="text-slate-600 mr-2" />{' '}
            <span className="text-slate-600 text-md">{training.displayPrice}{training.priceUnit === 'per_hour' ? '/hour' : ''}</span>
          </div>
          <div className="flex flex-row items-center  pb-2 md:pb-0">
            <HiOutlineLocationMarker size={24} className="text-slate-600 mr-2" />{' '}
            {training.location && training.city && (
              <span className="text-slate-400">
                {training.city}, {training.state}
              </span>
            )}
            {!training.location || (!training.city && <span className="text-slate-400">United States</span>)}
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
              training.externalLink ?? training.directLink ?? training.company?.externalLink ?? training.company?.directLink
            }
            target="_blank"
            className="p-2 bg-black text-center text-white w-full md:w-auto mt-4 md:mt-0 rounded font-bold whitespace-nowrap"
          >
            {training.appointmentOnly ? 'Schedule Now' : 'Sign Up Now'}
          </a>
        </div>
        <div className="mt-2">
          <div dangerouslySetInnerHTML={{ __html: training.description.html }} />
        </div>
      </div>
    </Modal>
  )
}
