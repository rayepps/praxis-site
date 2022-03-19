import _ from 'radash'
import WideModal from 'src/components/ui/WideModal'
import { HiX } from 'react-icons/hi'
import { useState } from 'react'

export default function LargeSubscribeToAlertsModal({
  open,
  subscribed = false,
  loading = false,
  onSubmit,
  onClose
}: {
  open: boolean
  subscribed?: boolean
  loading?: boolean
  onSubmit?: (email: string) => void
  onClose?: () => void
}) {

  console.log('x--> PROPS')
  console.log({ open, subscribed, loading })

  const [email, setEmail] = useState('')
  const [subscribeIdx] = useState(_.random(0, 2))

  const subscribeImagePath = `/marketing/subscribe-${subscribeIdx}.jpg`
  const isValid = email && email.includes('@')

  const handleSubmit = async () => {
    onSubmit?.(email)
  }

  return (
    <WideModal open={open} onClose={onClose}>
      <div className="flex flex-row">
        <div className="grow max-w-[60%]">
          <img src={subscribeImagePath} className="h-full w-full object-cover object-bottom" />
        </div>
        <div className="grow p-4 md:p-8 bg-slate-50 flex flex-col justify-between">
          <div className="flex flex-row items-start mb-20">
            <div className="mr-2 grow">
              <h4 className="text-4xl pr-8 font-black block mb-1">New Event Notifications</h4>
              <p className="text-lg mb-2 text-gray-800 block max-w-prose">
                We'll send you an email when a new event is added. The best classes fill up quick. Some training
                companies add courses just a few days before they happen. Don't miss out.
              </p>
            </div>
            <div className="flex flex-row items-center">
              <button onClick={onClose}>
                <HiX size={24} className="text-black" />
              </button>
            </div>
          </div>
          {!subscribed && (
            <div className="flex flex-row items-stretch mt-6">
              <input
                className="mr-4 grow appearance-none border-b rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="operator@gmail.com"
                value={email}
                onChange={ev => setEmail(ev.target.value)}
              />
              <button
                onClick={handleSubmit}
                disabled={!isValid}
                className="bg-yellow-300 rounded-md font-bold p-4 hover:cursor-pointer"
              >
                {!loading && <span>Subscribe</span>}
                {loading && (
                  <div className="flex justify-center items-center">
                    <div
                      className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </button>
            </div>
          )}
          {subscribed && (
            <div className="flex flex-row items-center mt-6">
              <div className="grow">
                <span className="font-bold block text-md pr-2">You're subscribed!</span>
                <span className="font-bold block text-md pr-2">As you were then...</span>
              </div>
              <button
                onClick={onClose}
                className="bg-yellow-300 rounded-md font-bold p-4 hover:cursor-pointer"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </WideModal>
  )
}
