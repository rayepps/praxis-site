import Link from 'next/link'
import { Split, Center } from '../Layout'
import * as t from 'src/types'
import theme from 'src/theme'

export default function TrainingScene({ training }: { training: t.Training }) {
  return (
    <>
      <Split className="p-4">
        <Split flex={1} alignItems="center">
          <img src={training.company.thumbnail.url} className="h-12" />
          <div className="ml-2">
            <h1>{training.name}</h1>
            <span>by {training.company.name}</span>
          </div>
        </Split>
        <div>
          <a
            href={training.externalLink ?? training.directLink ?? '/'}
            className="text-black"
          >
            Sign up at {training.company.name}
          </a>
        </div>
      </Split>
      <Split className="p-4">
        <div className="grow max-w-lg min-w-[300px] flex flex-col">
          {training.gallery.map(asset => (
            <img key={asset.url} src={asset.url} className="rounded mb-2" />
          ))}
        </div>
        {training.description?.html && (
          <div className="grow ml-4 max-w-[600px]">
            <div dangerouslySetInnerHTML={{ __html: training.description.html }} />
          </div>
        )}
      </Split>
    </>
  )
}
