import { useState } from 'react'
import Link from 'next/link'
import {
  HiOutlineLocationMarker,
  HiArrowNarrowRight,
  HiOutlineMailOpen,
  HiOutlineTag,
  HiOutlineBell,
  HiOutlineCash
} from 'react-icons/hi'
import { useFetch } from 'src/hooks'
import api from 'src/api'
import * as t from '../../types'
import EventGrid from '../ui/EventGrid'

export default function GiveawayScene({ giveaway }: { giveaway: t.Giveaway | null }) {
  if (!giveaway) {
    return (
      <div>
        We don't have any giveaway active right now. If you want to win a free training let us know on social media
        @praxiscous.
      </div>
    )
  }
  return (
    <>
      <div className="px-2 md:px-8 py-20 items-center justify-center lg:flex lg:flex-row">
        <div className="max-w-6xl lg:flex lgflex-row">
          <h1 className="text-3xl font-bold">{giveaway.name}</h1>
          <CountdownClock to={giveaway.endDate} />
          <div>
            <EventGrid events={giveaway.events} />
          </div>
          <p>
            Enter to win one of these events. Praxis will pay for you to get incredible training.
          </p>
          {/* <EnterToWinForm /> */}
        </div>
      </div>
    </>
  )
}

const CountdownClock = ({
  to: date
}: {
  to: string
}) => {
  return (
    <></>
  )
}

// const EnterToWinForm = () => {
//   const enterGiveawayRequest = useFetch(api.marketing.addContact)
//   const [email, setEmail] = useState('')
//   const [showToast, setShowToast] = useState(false)
//   const handleFormSubmission = async () => {
//     const { error } = await enterGiveawayRequest.fetch({ email, source: form })
//     if (error) return
//     setShowToast(true)
//     setTimeout(() => setShowToast(false), 5000)
//   }
//   const isValid = email?.length > 0 && email.includes('@')
//   return (
//     <div>
//       <div className="flex flex-row items-stretch mt-6">
//         <input
//           className="mr-4 grow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//           id="email"
//           type="text"
//           placeholder="operator@gmail.com"
//           value={email}
//           onChange={ev => setEmail(ev.target.value)}
//         />
//         <button onClick={handleFormSubmission} disabled={!isValid} className="bg-yellow-300 rounded-md font-bold p-4">
//           {!enterGiveawayRequest.loading && <span>Send</span>}
//           {enterGiveawayRequest.loading && (
//             <div className="flex justify-center items-center">
//               <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </div>
//           )}
//         </button>
//       </div>
//       {enterGiveawayRequest.error && <span className="text-red-600">{addContactRequest.error.details}</span>}
//       {showToast && (
//         <div
//           id="toast-simple"
//           className="flex items-center p-4 space-x-4 w-full max-w-xs text-white bg-green-400 rounded-lg divide-x divide-gray-200 shadow space-x fixed right-1/2 top-5"
//           role="alert"
//         >
//           <svg
//             className="w-5 h-5 text-white"
//             aria-hidden="true"
//             focusable="false"
//             data-prefix="fas"
//             data-icon="paper-plane"
//             role="img"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 512 512"
//           >
//             <path
//               fill="currentColor"
//               d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"
//             ></path>
//           </svg>
//           <div className="pl-4 text-md font-bold">Your in!</div>
//         </div>
//       )}
//     </div>
//   )
// }
