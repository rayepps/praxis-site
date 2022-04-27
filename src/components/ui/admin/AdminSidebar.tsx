import Link from 'next/link'
import Wordmark from 'src/components/svg/PraxisWordmark'

export default function AdminSidebar({}: {}) {
  return (
    <div className="max-w-20 w-64 p-4">
      <div className="mb-10">
        <Link href="/" passHref>
          <a>
            <Wordmark height={23} className="inline-block" color="#000000" />
          </a>
        </Link>
      </div>
      <div>
        <div className="mb-6">
          <Link href="/hq/dashboard" passHref>
            <a className="text-lg">Dashboard</a>
          </Link>
        </div>
      </div>
      <div>
        <span className="font-bold text-xs uppercase mb-2 inline-block">Content</span>
        <div className="mb-4">
          <Link href="/hq/trainings" passHref>
            <a className="text-lg">Trainings</a>
          </Link>
        </div>
        <div className="mb-4">
          <Link href="/hq/events" passHref>
            <a className="text-lg">Events</a>
          </Link>
        </div>
        <div className="mb-4">
          <Link href="/hq/companies" passHref>
            <a className="text-lg">Companies</a>
          </Link>
        </div>
      </div>
    </div>
  )
}
