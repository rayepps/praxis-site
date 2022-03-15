import { Center } from '../Layout'

export default function Footer() {
  return (
    <div className="md:py-4 mt-28 text-center">
      <span className="text-sm">
        Follow us{' '}
        <a className="text-yellow-400 font-bold" target="blank" href="https://twitter.com/praxiscous">
          @praxiscous
        </a> or email us directly at{' '}
        <a className="text-yellow-400 font-bold" href="mailto:ray@praxisco.us">
          ray@praxisco.us
        </a>
      </span>
    </div>
  )
}
