import Link from 'next/link'
import Wordmark from 'src/components/svg/PraxisWordmark'


export default function AdminHeader({
  
}: {
  
}) {
  return (
    <div className={`w-screen flex flex-row justify-center`}>
      <div className="p-4 items-center flex flex-row grow max-w-screen-3xl w-full">
        <div className="grow flex flex-row items-center">
          <Link href="/hq/dashboard" passHref>
            <a>
              <Wordmark height={13} className="inline-block" color="#000000" />
            </a>
          </Link>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  )
}
