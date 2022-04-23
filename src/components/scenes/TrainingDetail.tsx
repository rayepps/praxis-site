import _ from 'radash'
import formatDate from 'date-fns/format'
import * as t from 'src/types'
import HorizontalGallery from 'src/components/ui/HorizontalGallery'
import {
  HiX,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
  HiArrowNarrowRight
} from 'react-icons/hi'
import Markdown from '../ui/Markdown'
import CopyToClipboard from '../ui/CopyToClipboard'

export default function TrainingDetailScene({ training }: { training: t.Training }) {
  const format = (date: Date | null) => {
    if (!date) return ''
    return formatDate(date, 'MMM do')
  }

  const images = [
    ..._.unique(
      training.gallery.filter(img => img.url !== training.company.thumbnail?.url),
      img => img.url
    ),
    training.company.thumbnail
  ].filter(x => !!x)

  return (
    <>
      <div className="flex flex-row justify-center mt-20">
        <div className="max-w-screen-3xl w-full px-4">
          <div className="flex flex-row justify-center">
            <div className="max-w-screen-lg grow">
              <div className="block md:flex flex-row-reverse items-start mb-8">
                <div className="rounded-lg h-40 w-40 mb-4 md:mb-0">
                  <img src={training.company?.thumbnail?.url} className="object-cover h-full w-full rounded-lg" />
                </div>
                <div className="pr-10 grow">
                  <h1 className="text-5xl font-bold block">{training.name}</h1>
                  <span className="text-xl mb-2 text-gray-400 block">{training.company.name}</span>
                  <div className="">
                    {training.tags?.map(tag => (
                      <div key={tag.slug} className="px-2 bg-gray-200 rounded inline-block mr-2 mb-2">
                        <span className="font-bold text-xs text-slate-500">{tag.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between bg-gray-50 mb-8 p-4 rounded-md">
                <div className="flex flex-row items-center pb-2 md:pb-0">
                  <HiOutlineCurrencyDollar size={24} className="text-slate-600 mr-2" />{' '}
                  <span className="text-slate-600 text-md">{training.displayPrice}</span>
                </div>
                <div className="flex flex-row items-center  pb-2 md:pb-0">
                  <HiOutlineLocationMarker size={24} className="text-slate-600 mr-2" />{' '}
                  <span className="text-slate-600 text-md">
                    {training.city}, {training.state}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4">
        <HorizontalGallery images={images.map(img => img.url)} className="h-96" />
      </div>
      <div className="flex flex-row justify-center">
        <div className="max-w-screen-3xl px-4">
          <div className="flex flex-row justify-center">
            <div className="max-w-screen-md">
              <div className="my-6 flex flex-col md:flex-row rounded-lg bg-gray-50 items-center p-6">
                <div className="grow pr-6">
                  <h6 className="text-2xl text-center md:text-left font-bold pb-2 md:pb-0">Theory vs. Action</h6>
                  <p className="text-lg text-center md:text-left font-medium max-w-prose">
                    The moment where your plans and ideas become action. Do more than think about training. Train.
                  </p>
                </div>
                <a
                  href={
                    training.externalLink ??
                    training.directLink ??
                    training.company?.externalLink ??
                    training.company?.directLink
                  }
                  target="_blank"
                  className="p-2 bg-black text-center text-white w-full md:w-auto mt-4 md:mt-0 rounded font-bold whitespace-nowrap"
                >
                  Sign Up Now
                </a>
              </div>
              <div className="my-2 relative">
                {training.description?.markdown ? (
                  <Markdown markdown={training.description.markdown} />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: training.description?.html ?? '' }} />
                )}
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white h-20"></div>
              </div>
              <div className="my-6 flex flex-col md:flex-row rounded-lg bg-gray-50 items-center p-6">
                <div className="grow pr-6">
                  <h6 className="text-2xl text-center md:text-left font-bold pb-2 md:pb-0">More Information</h6>
                  <p className="text-lg text-center md:text-left font-medium max-w-prose">
                    Read the rest at {training.company.name}. Course instructors, directions, required equipment, and
                    other details await.
                  </p>
                </div>
                <a
                  href={
                    training.externalLink ??
                    training.directLink ??
                    training.company?.externalLink ??
                    training.company?.directLink
                  }
                  target="_blank"
                  className="p-2 bg-black flex flex-row text-center justify-center items-center text-white w-full md:w-auto mt-4 md:mt-0 rounded font-bold whitespace-nowrap"
                >
                  <span>Go Now</span>
                  <HiArrowNarrowRight className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
