import Link from 'next/link'
import Wordmark from '../svg/PraxisWordmark'
import { HiOutlineBell } from 'react-icons/hi'
import { useSetRecoilState } from 'recoil'
import { subscribeModalOpenState } from 'src/state/app'

export type HeaderLinks = 'trainings' | 'search-all' | 'about'

export default function Header({
  showBell = false,
  links
}: {
  showBell?: boolean
  links?: HeaderLinks | HeaderLinks[]
}) {
  const setSubscribeModalOpen = useSetRecoilState(subscribeModalOpenState)
  return (
    <div className={`w-screen flex flex-row justify-center`}>
      <div className="p-4 items-center flex flex-row grow max-w-screen-3xl w-full">
        <div className="grow flex flex-row items-center">
          <Link href="/" passHref>
            <a>
              <Wordmark height={13} className="inline-block" color="#000000" />
            </a>
          </Link>
        </div>
        <div>
          {showBell && (
            <button className="p-1 group hover:bg-black rounded" onClick={() => setSubscribeModalOpen(true)}>
              <HiOutlineBell size={22} className="text-black group-hover:text-white" />
            </button>
          )}
          {links?.includes('about') && (
            <Link href="/about" passHref>
              <a className="text-black text-base inline-block mr-4">
                <span className="font-bold">About</span>
              </a>
            </Link>
          )}
          {links?.includes('trainings') && (
            <Link href="/training" passHref>
              <a className="text-white bg-black rounded-md p-2 text-base inline-block">
                <span className="font-bold">Trainings</span>
              </a>
            </Link>
          )}
          {links?.includes('search-all') && (
            <Link href="/training" passHref>
              <a className="text-white bg-black rounded-md p-2 text-base inline-block">
                <span className="font-bold">All Trainings</span>
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
