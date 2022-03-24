import Link from 'next/link'
import Wordmark from '../svg/PraxisWordmark'
import { HiOutlineBell } from 'react-icons/hi'
import { useSetRecoilState } from 'recoil'
import { subscribeModalOpenState } from 'src/state/app'

export default function Header({
  showTrainingsLink = true,
  showBell = false,
  dark = false
}: {
  showTrainingsLink?: boolean
  showBell?: boolean
  dark?: boolean
}) {
  const setSubscribeModalOpen = useSetRecoilState(subscribeModalOpenState)
  return (
    <div className={`w-screen flex flex-row justify-center ${dark && 'bg-black'}`}>
      <div className="p-4 items-center flex flex-row grow max-w-screen-3xl w-full">
        <div className="grow flex flex-row items-center">
          <Link href="/" passHref>
            <a>
              <Wordmark height={13} className="inline-block" color={dark ? '#FFFFFF' : '#000000'} />
            </a>
          </Link>
        </div>
        <div>
          {showBell && (
            <button className="p-1 group hover:bg-black rounded" onClick={() => setSubscribeModalOpen(true)}>
              <HiOutlineBell size={22} className="text-black group-hover:text-white" />
            </button>
          )}
          {showTrainingsLink && (
            <Link href="/search" passHref>
              <a className="text-white bg-black rounded-md p-2 text-base inline-block">
                <span className="font-bold">Trainings</span>
              </a>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
