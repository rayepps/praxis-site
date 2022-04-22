import _ from 'radash'
import * as t from 'src/types'
import states from './states'

export default function USStatesMapGrid({
  counts,
  onStateClick
}: {
  counts?: Record<string, number>
  onStateClick?: (state: t.StateAbbreviation) => void
}) {
  const stateAt = (x: number, y: number) => {
    const state = states.find(s => s.x === x && s.y === y)
    if (!state) return null
    return {
      ...state,
      cidx: ((x ^ 5) + y) % 5
    }
  }
  return (
    <div className="px-us-states-map-grid grid w-full grid-cols-11 gap-1 md:gap-2">
      {_.range(0, 7).map(y =>
        _.range(0, 10).map(x => {
          const key = `(${x}, ${y})`
          const state = stateAt(x, y)
          if (!state) {
            return <div key={key} className=""></div>
          }
          if (counts && !counts[state.abbreviation]) {
            return (
              <div
                key={key}
                onClick={() => onStateClick?.(state.abbreviation)}
                className={`bg-slate-200 relative flex items-center justify-center rounded-sm md:rounded hover:cursor-pointer`}
              >
                <div className="flex flex-col items-center">
                  <div>
                    <span className="text-base md:text-3xl font-black uppercase text-white">{state.abbreviation}</span>
                  </div>
                  <div className="rounded-lg px-3">
                    <span className="font-black text-xs">&nbsp;</span>
                  </div>
                </div>
              </div>
            )
          }
          return (
            <div
              key={key}
              onClick={() => onStateClick?.(state.abbreviation)}
              className={`px-us-states-map-box-${state.cidx} relative flex items-center justify-center rounded-sm md:rounded hover:cursor-pointer`}
            >
              <div className="flex flex-col items-center">
                <div>
                  <span className="text-base md:text-3xl font-black uppercase text-white">{state.abbreviation}</span>
                </div>
                <div className="rounded-lg bg-white-opaque px-3">
                  <span className="font-black text-xs">{counts ? counts[state.abbreviation] : null}</span>
                </div>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
