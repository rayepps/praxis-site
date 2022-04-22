import { useState } from 'react'
import Link from 'next/link'
import {
  HiOutlineLocationMarker,
  HiArrowNarrowRight,
  HiOutlineTag,
  HiOutlineBell,
  HiOutlineCash
} from 'react-icons/hi'
import { useFetch } from 'src/hooks'
import api from 'src/api'
import * as t from '../../types'

export default function AboutScene() {
  return (
    <>
      <div className="px-4 md:px-8 py-20 items-center justify-center mt-30 lg:flex lg:flex-row">
        <div className="max-w-6xl items-start lg:flex lg:flex-row">
          <div className="bg-black rounded-xl grow p-12 lg:mr-6 mb-10 lg:mb-0">
            <h2 className="md:text-5xl text-3xl font-bold mb-4 text-white">
              Become a <br />
              Partner
            </h2>
            <p className="max-w-prose pr-12 text-white">
              Our goal is to make tier one tactical and medical training more available for the average American. Most
              training companies are mom &amp; pop shops that work on word of mouth. We find those companies, list them,
              and share their training events with the country.{' '}
              <i className="text-yellow-300 font-bold">To do this, we need partners.</i>
            </p>
            <p className="max-w-prose pr-12 text-white mt-4">
              If you run a tactical training company or know someone who does please let us know by sending us your
              email below.
            </p>
            <AddContactForm form="partner" />
          </div>
          <div className="bg-gray-100 rounded-xl grow p-12 lg:ml-6 lg:relative top-36">
            <h2 className="md:text-5xl text-3xl font-bold mb-4">
              Coming <br />
              Soon
            </h2>
            <p className="max-w-prose">
              Praxis is just getting started. Our goal is to make high level training more available to the average American. Filling our database with
              companies and events is priority. Here's what we're planning next.
            </p>
            <div className="mt-8 flex flex-col md:flex-row">
              <div
                className="bg-black flex flex-row p-2 rounded-md justify-center items-center"
                style={{
                  height: '40px',
                  width: '40px'
                }}
              >
                <HiOutlineBell className="text-white" size={30} />
              </div>
              <div className="grow mt-2 md:mt-0 md:ml-4">
                <h3 className="font-bold text-lg mb-0">Notifications</h3>
                <p className="text-sm max-w-prose">
                  Get alerted when a new event is added in your area or by your favorite company. Be the first to know
                  when a new company or training is added and get a spot before its full.
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-col md:flex-row">
              <div
                className="bg-black p-2 flex flex-row rounded-md justify-center items-center"
                style={{
                  height: '40px',
                  width: '40px'
                }}
              >
                <HiOutlineCash className="text-white" size={30} />
              </div>
              <div className="grow mt-2 md:mt-0 md:ml-4">
                <h3 className="font-bold text-lg mb-0">Promotions</h3>
                <p className="text-sm max-w-prose">
                  As we work with our training partners we'll be sponsoring their best events to help get you the best
                  training. Stay tuned for some incredible deals.
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-col md:flex-row">
              <div
                className="bg-black flex flex-row p-2 rounded-md justify-center items-center"
                style={{
                  height: '40px',
                  width: '40px'
                }}
              >
                <HiOutlineTag className="text-white" size={30} />
              </div>
              <div className="grow mt-2 md:mt-0 md:ml-4">
                <h3 className="font-bold text-lg mb-0">Merch</h3>
                <p className="text-sm max-w-prose">
                  We're working on Praxis swag that you'll be proud to wear and represent. Earn free swag when you
                  purchase events through the Praxis platform (also coming soon).
                </p>
              </div>
            </div>
            <h4 className="text-3xl font-bold mt-8">Early Access</h4>
            <p className="max-w-prose">
              Send us your email below and we'll email you first when these features are ready.
            </p>
            <AddContactForm form="early-access" />
          </div>
        </div>
      </div>
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
        <Link href="/search" passHref key={event.id}>
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
              <div className="flex flex-col p-4 max-w-[224px]">
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

const AddContactForm = ({ form }: { form: 'partner' | 'early-access' }) => {
  const addContactRequest = useFetch(api.marketing.addContact)
  const [email, setEmail] = useState('')
  const [showToast, setShowToast] = useState(false)
  const handleFormSubmission = async () => {
    const { error } = await addContactRequest.fetch({ 
      email, 
      source: form === 'partner' ? 'site.partner.form' : 'site.contact.form'
    })
    if (error) return
    setShowToast(true)
    setTimeout(() => setShowToast(false), 5000)
  }
  const isValid = email?.length > 0 && email.includes('@')
  return (
    <div>
      <div className="flex flex-row items-stretch mt-6">
        <input
          className="mr-4 grow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="operator@gmail.com"
          value={email}
          onChange={ev => setEmail(ev.target.value)}
        />
        <button onClick={handleFormSubmission} disabled={!isValid} className="bg-yellow-300 rounded-md font-bold p-4">
          {!addContactRequest.loading && <span>Send</span>}
          {addContactRequest.loading && (
            <div className="flex justify-center items-center">
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </button>
      </div>
      {addContactRequest.error && <span className="text-red-600">{addContactRequest.error.details}</span>}
      {showToast && (
        <div
          id="toast-simple"
          className="flex items-center p-4 space-x-4 w-full max-w-xs text-white bg-green-400 rounded-lg divide-x divide-gray-200 shadow space-x fixed right-1/2 top-5"
          role="alert"
        >
          <svg
            className="w-5 h-5 text-white"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="paper-plane"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"
            ></path>
          </svg>
          <div className="pl-4 text-md font-bold">Message sent successfully.</div>
        </div>
      )}
    </div>
  )
}
