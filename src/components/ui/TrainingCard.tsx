import { HiOutlineLocationMarker } from 'react-icons/hi'
import * as t from 'src/types'

export default function TrainingCard({ 
  training,
  onClick 
}: { 
  training: t.Training
  onClick?: () => void 
}) {
  if (!training) return null

  const thumbnailUrl = (() => {
    if (training.thumbnail) {
      return training.thumbnail.url
    }
    if (training.company?.thumbnail) {
      return training.company.thumbnail.url
    }
    // TODO: Return a default image that won't
    // error or show blank on UI for best UX
    return ''
  })()

  return (
    <div className="drop-shadow-lg flex flex-col">
      <div className="relative h-56 w-full hover:cursor-pointer" onClick={onClick}>
        <img src={thumbnailUrl} className="object-cover h-full w-full rounded-t-lg" />
        {!!training.price && (
          <div className="rounded py-1 px-2 left-3 top-3 absolute bg-white-opaque">
            <span className="font-bold">{training.displayPrice}{training.priceUnit === 'per_hour' ? '/hour' : ''}</span>
          </div>
        )}
        {training.recentlyAdded === true && (
          <div className="rounded py-1 px-2 right-3 top-3 absolute bg-green-600">
            <span className="text-xs font-black text-white uppercase">new</span>
          </div>
        )}
      </div>
      <div className="p-3 grow bg-white flex flex-col rounded-b-md">
        <div className="grow flex flex-row">
          <div className="grow">
            <h4 className="text-xl pr-2 font-bold hover:underline hover:cursor-pointer" onClick={onClick}>{training.name}</h4>
            <span className="text-sm font-semibold mb-2 text-gray-600 inline-block">{training.company.name}</span>
            <div className="">
              {training.tags.map(tag => (
                <div key={tag.slug} className="px-2 bg-gray-200 rounded inline-block mr-2 mb-2">
                  <span className="font-bold text-xs text-slate-500">{tag.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* <img src={training.company?.thumbnail?.url} className="object-cover h-10 w-10 rounded" /> */}
        </div>
        <div className="flex flex-row">
          <div className="grow">
            <div className="flex flex-row items-center">
              <HiOutlineLocationMarker size={16} className="text-slate-400 mr-2" />{' '}
              {training.location && training.city && (
                <span className="text-slate-400">
                  {training.city}, {training.state}
                </span>
              )}
              {!training.location || !training.city && (
                <span className="text-slate-400">
                  United States
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
