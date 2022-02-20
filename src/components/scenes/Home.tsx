import Link from 'next/link'
import { Stack, Center, Split } from '../Layout'
import PraxisStar from '../svg/PraxisStar'
import TrainingList from '../ui/TrainingList'
import StatsBlocks from '../ui/StatsBlocks'
import LabeledImageList from '../ui/LabeledImageList'
import * as t from '../../types'

export default function HomeScene({
  popularTrainings,
  featuredTags
}: {
  popularTrainings: t.Training[]
  featuredTags: t.FeatureTag[]
}) {
  return (
    <>
      {/* HERO */}
      <Split className="min-h-[80vh] border-b-slate-200 border-b-2 py-4">
        <Stack className="grow px-4 justify-center">
          <div>
            <h1 className="text-7xl">
              This Is Where Theory <br />
              Meets Practice
            </h1>
            <p className="max-w-sm">
              Its time to get out and get well trained. Put in the sweat and have the fun. We’ll bring you the best
              companies, courses, and events to choose from.
            </p>
          </div>
          <div className="mt-6">
            <Link href="/search">
              <a className="mr-4 p-4 text-white bg-black rounded">Start Training</a>
            </Link>
            <a href="https://shop.praxisco.us" className="text-black">
              Start Training
            </a>
          </div>
        </Stack>
        <Center className="grow">
          <PraxisStar className="h-96" />
        </Center>
      </Split>

      {/* POPULAR TRAINNGS */}
      <Stack className="p-4">
        <Split>
          <div className="grow">
            <h2 className="font-bold text-4xl">Popular Trainings</h2>
            <p className="max-w-prose">
              These are some of our most popular trainings from some our best companies. You can gaurntee they won't be
              easy, but they will be worth it.
            </p>
          </div>
        </Split>
        <TrainingList orientation="horizontal" trainings={popularTrainings} />
      </Stack>

      {/* STATS */}
      <div className="py-10">
        <StatsBlocks
          stats={[
            { value: 100, label: 'Trainings' },
            { value: 50, label: 'Companies' },
            { value: 20, label: 'States' },
            { value: 500, label: 'Events/Year' }
          ]}
        />
      </div>

      {/* FEATURED TAGS */}
      <Stack className="p-4">
        <div>
          <h2 className="font-bold text-4xl">Advanced &amp; Unique</h2>
          <p className="max-w-prose">
            These are not hunter safety, concealed carry permit, or firearm safety courses. You can find those anywhere.
            Praxis is about traiing for that moment when your mental, emotional, and physical abilities are the
            difference between failure and survival.
          </p>
        </div>
        <LabeledImageList
          items={featuredTags.map(ft => ({
            imageUrl: ft.thumbnail.url,
            label: ft.tag.name,
            link: `/tag/${ft.tag.slug}`
          }))}
        />
      </Stack>
    </>
  )
}
