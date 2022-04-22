import _ from 'radash'
import { HiX } from 'react-icons/hi'
import { useState } from 'react'
import Modal from '../ui/Modal'
import stateData from 'src/data/states'
import * as t from 'src/types'

export default function NewStateSubscribeModal({
  open,
  state,
  subscribed = false,
  loading = false,
  onSubmit,
  onClose
}: {
  open: boolean
  state: t.StateAbbreviation
  subscribed?: boolean
  loading?: boolean
  onSubmit?: (email: string) => void
  onClose?: () => void
}) {
  const [email, setEmail] = useState('')
  const isValid = email && email.includes('@')

  const stateName = stateData.nameLookup[state]

  const handleSubmit = async () => {
    onSubmit?.(email)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-row items-start mb-16">
        <div className="mr-2 grow">
          <h4 className="text-4xl font-black block mb-2">
            Coming Soon to
            <br />
            {stateName}
          </h4>
          <p className="text-lg mb-2 text-gray-800 block max-w-[40ch]">
            We add about 20 new training events every week. We're working to cover every location in the US. Drop your
            email and we'll ping you when we add training events in {stateName}.
          </p>
        </div>
        <div className="flex flex-row items-center">
          <button onClick={onClose}>
            <HiX size={24} className="text-black" />
          </button>
        </div>
      </div>
      {!subscribed && (
        <div className="flex flex-row items-stretch">
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
            {!loading && <span>Notify&nbsp;Me</span>}
            {loading && (
              <div className="flex justify-center items-center">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </button>
        </div>
      )}
      {subscribed && (
        <div className="flex flex-row items-center">
          <div className="grow">
            <span className="font-bold block text-md pr-2">You're subscribed!</span>
            <span className="font-bold block text-md pr-2">As you were then...</span>
          </div>
          <button onClick={onClose} className="bg-yellow-300 rounded-md font-bold p-4 hover:cursor-pointer">
            Close
          </button>
        </div>
      )}
      <div className="mt-5 flex justify-center">
        <span className="text-sm max-w-[46ch] text-center inline-block">
          Do you know a training in {stateName}? Tell us about it at {' '}
          <a className="text-yellow-400 font-bold" href="mailto:ray@praxisco.us">
            ray@praxisco.us
          </a> so we can add it.
        </span>
      </div>
    </Modal>
  )
}
