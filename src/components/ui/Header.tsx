import Link from 'next/link'
import { Split } from '../Layout'
import Wordmark from '../svg/PraxisWordmark'

export default function Header({ showTrainingsLink = true }: { showTrainingsLink?: boolean }) {
  return (
    <div className="p-4 items-center flex flex-row z-10">
      <div className="grow">
        <Link href="/" passHref>
          <a>
            <Wordmark height={18} className="inline-block" />
          </a>
        </Link>
      </div>
      <div>
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
  )
}
