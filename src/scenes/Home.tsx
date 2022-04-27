import { useState } from 'react'
import Link from 'next/link'
import {
  HiOutlineLocationMarker,
  HiArrowNarrowRight
} from 'react-icons/hi'
import { useFetch } from 'src/hooks'
import api from 'src/api'
import * as t from '../types'
import USStatesMapGrid from '../components/ui/USStatesMapGrid'
import { useRouter } from 'next/router'
import useAnalytics from 'src/hooks/useAnalytics'
import NewStateSubscribeModal from '../components/modals/NewStateSubscribeModal'
import { toaster } from 'evergreen-ui'
import useLocalSession from 'src/hooks/useLocalSession'

export default function HomeScene({ featuredEvents, stateTrainingCounts }: { 
  featuredEvents: t.Event[]
  stateTrainingCounts: Record<string, number>
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalState, setModalState] = useState<null | t.StateAbbreviation>(null)
  const analytics = useAnalytics()
  const router = useRouter()
  const session = useLocalSession()
  const subscribeRequest = useFetch(api.marketing.addContact)
  const gotoSearch = (state: t.StateAbbreviation) => {
    analytics?.track_interactive_map_used(state)
    if (stateTrainingCounts[state] > 0) {
      router.push(`/training?state=${state}`)
      return
    }
    setModalState(state)
    setModalOpen(true)
  }
  const subscribeToNewEvents = async (email: string) => {
    const { error } = await subscribeRequest.fetch({
      email,
      source: `site.new-events-in-state.${modalState!}`
    })
    if (error) {
      console.error(error)
      toaster.danger(error.details)
      return
    }
    session.record(`user.declined.new-events-by-state.${modalState!}`, {}, '60 days')
  }
  return (
    <>
      {/* HERO */}
      <div className="px-2 md:px-8 py-20 items-center justify-center lg:flex lg:flex-row">
        <div className="max-w-6xl lg:flex lgflex-row">
          <div className="flex flex-col grow px-4 justify-center mb-24 md:mb-0">
            <div>
              <h1 className="text-5xl font-bold mb-4 md:text-7xl">
                Tactical <br />
                Survival <br />
                &amp; Medical <br />
                Training
              </h1>
              <span className="text-xl font-medium mb-2 inline-block text-gray-500 italic">
                A responsibility, not just a right.
              </span>
              <p className="max-w-prose md:pr-12 text-lg">
                We curate a list of the best tier one companies instructed by combat experienced veterans, former law
                enforcement, and competitive shooters. Learn to be one with your weapon.
              </p>
            </div>
            <div className="mt-6">
              <Link href="/training" passHref>
                <a className="text-white bg-black rounded-md py-2 px-3 text-base inline-block group">
                  <span className="mr-2 font-bold transition-[margin-right] group-hover:mr-4">Start Training</span>
                  <HiArrowNarrowRight size={20} className="inline-block" />
                </a>
              </Link>
            </div>
          </div>
          <EventTrainingPreviewBlocks events={featuredEvents} />
        </div>
      </div>

      {/* <div className="px-4 md:px-8 py-20 items-center justify-center mt-30 lg:flex lg:flex-row">
        <div className="max-w-6xl w-full">
          <div className="mb-4 md:mb-20">
            <h4 className="text-2xl md:text-5xl font-bold mb-2">Where do you train?</h4>
            <p className="text-xl max-w-[45ch]">
              We're adding new trainings every day with the goal of covering this map. As of today,
              this is where we can gaurntee top notch training.
            </p>
          </div>
          <div className="">
            <USStatesMapGrid onStateClick={gotoSearch} counts={stateTrainingCounts} />
          </div>
        </div>
      </div>

      <NewStateSubscribeModal
        open={modalOpen}
        loading={subscribeRequest.loading}
        onSubmit={subscribeToNewEvents}
        onClose={() => setModalOpen(false)}
        subscribed={!!session.find(`user.declined.new-events-by-state.${modalState!}`)}
        state={modalState!}
      /> */}
    </>
  )
}

const EventTrainingPreviewBlocks = ({ events }: { events: t.Event[] }) => {
  const getBestImageUrl = (event: t.Event): string => {
    if (event.images?.length > 0) return event.images[0].url
    return event.training.thumbnail.url
  }
  const getOffsetForIndex = (index: number) => {
    const OFFSETS: Record<number, any> = {
      0: {
        left: '2.75rem'
      },
      1: {
        right: '1.25rem'
      },
      2: {
        left: '1.5rem'
      }
    }
    return OFFSETS[index % 3]
  }
  return (
    <div className="md:p-10 p-2">
      {events.map((event, idx) => (
        <Link href={`/e/${event.slug}`} passHref key={event.id}>
          <a>
            <div
              className="bg-white group flex flex-row rounded-lg shadow-md md:relative mb-6 hover:cursor-pointer"
              style={getOffsetForIndex(idx)}
            >
              <div
                className="h-56 w-56 rounded-l-lg bg-center bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url('${getBestImageUrl(event)}')`
                }}
              ></div>
              <div className="flex flex-col p-2 max-w-[224px]">
                <span className="font-bold text-2xl inline-block">{event.name}</span>
                <span className="text-base text-gray-400 inline-block">{event.training.company.name}</span>
                <div className="pt-2 grow">
                  {event.training.tags.map(tag => (
                    <div key={tag.slug} className="px-2 bg-gray-200 rounded inline-block mr-2 mb-2">
                      <span className="font-bold text-xs text-slate-500">{tag.name}</span>
                    </div>
                  ))}
                </div>
                <div className="items-center flex flex-row">
                  <HiOutlineLocationMarker size={16} className="text-slate-400 mr-2" />{' '}
                  <span className="text-slate-400">
                    {event.city}, {event.state}
                  </span>
                </div>
                <div className="flex-row hidden lg:flex absolute animate-fade-in transition-opacity transition-[right] opacity-0 group-hover:opacity-100 right-[-60px] group-hover:right-[-65px] top-1/2 items-center">
                  <HiArrowNarrowRight size={20} />
                </div>
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  )
}
