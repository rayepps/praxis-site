import * as t from 'src/types'
import { Stack, Split } from 'src/components/Layout'
import formatDate from 'date-fns/format'
import { currentEventState } from 'src/state/search'
import { useSetRecoilState } from 'recoil'
import { Tooltip } from 'evergreen-ui'

export default function EventCard({ event }: { event: t.Event }) {
  const setCurrentEvent = useSetRecoilState(currentEventState)

  const start = event.startDate ? new Date(event.startDate) : null
  // const end = event.endDate ? new Date(event.endDate) : null

  const format = (date: Date | null) => {
    if (!date) return ''
    return formatDate(date, 'M.d.yyyy')
  }

  const handleClick = () => {
    setCurrentEvent(event.id)
  }

  return (
    <Stack onClick={handleClick}>
      <div
        className="rounded relative bg-cover bg-no-repeat bg-center h-56 w-full hover:cursor-pointer"
        style={{
          backgroundImage: `url(${event.training.thumbnail?.url})`
        }}
      >
        <div className="rounded py-1 px-2 left-3 top-3 absolute bg-[rgba(255, 255, 255, 0.8)]">
          <span className="font-bold">{event.training.displayPrice}</span>
        </div>
        <div className="opacity-0 rounded py-1 px-2 right-3 top-3 absolute bg-[rgba(0, 0, 0, 0.8)] transition-opacity">
          <span className="font-bold text-white">View</span>
        </div>
        <Tooltip content={event.training.company?.name}>
          <div
            className="rounded right-3 bottom-3 absolute bg-cover bg-no-repeat bg-center h-10 w-10"
            style={{
              backgroundImage: `url(${event.training.company?.thumbnail?.url})`
            }}
          />
        </Tooltip>
      </div>
      <div className="pt-1">
        <Split>
          <span className="font-bold text-green-600">{format(start)}</span>
          <span className="mx-2 text-yellow-600">|</span>
          <span className="font-bold text-green-600">
            {event.city}, {event.state}
          </span>
        </Split>
        <h4 className="text-lg">{event.training.name}</h4>
      </div>
    </Stack>
  )
}
