import Link from 'next/link'
import Wordmark from '../svg/PraxisWordmark'
import { HiOutlineBell } from 'react-icons/hi'
import { useSetRecoilState } from 'recoil'
import { subscribeModalOpenState } from 'src/state/app'

export default function Header({
  showTrainingsLink = true,
  showBell = false  
}: {
  showTrainingsLink?: boolean
  showBell?: boolean
}) {
  const setSubscribeModalOpen = useSetRecoilState(subscribeModalOpenState)
  return (
    <div className="w-screen flex flex-row justify-center">
      <div className="p-4 items-center flex flex-row grow max-w-screen-3xl w-full">
        <div className="grow">
          <Link href="/" passHref>
            <a>
              <Wordmark height={18} className="inline-block" />
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
          {/* <Link href="/about" passHref>
          <a
            className="text-black font-bold"
          >
            About
          </a>
        </Link> */}
          {/* <EvergreenLink
          href="https://shop.praxisco.us"
          padding={minorScale(2)}
          backgroundColor={theme.colors.black.hex()}
          style={{
            color: theme.colors.white.hex()
          }}
        >
          shop
        </EvergreenLink> */}
        </div>
      </div>
    </div>
  )
}
