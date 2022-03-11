import { Center } from '../Layout'

export default function Footer() {
  return (
    <div className="md:py-4 mt-28 text-center">
      <span className="font-bold text-sm">
        Email me at{' '}
        <a className="text-yellow-400" href="mailto:ray@praxisco.us">
          ray@praxisco.us
        </a>{' '}
        or message me at{' '}
        <a className="text-yellow-400" target="blank" href="https://twitter.com/repsofsunshine">
          @repsofsunshine
        </a>
      </span>
    </div>
  )
}
