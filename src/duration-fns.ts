import * as t from 'src/types'

export const parse = (duration: t.Duration, toUnit: t.UnitOfTime = 'seconds'): number => {
  const seconds = parseToSeconds(duration)
  return toUnit === 'seconds'
    ? seconds
    : convertSecondsToOtherUnit(seconds, toUnit)
}

const convertSecondsToOtherUnit = (seconds: number, unitOfTime: t.UnitOfTime) => {
  switch (unitOfTime) {
    case 'millisecond':
    case 'milliseconds':
      return seconds * 1000
    case 'second':
    case 'seconds':
      return seconds
    case 'minute':
    case 'minutes':
      return seconds / 60
    case 'hour':
    case 'hours':
      return seconds / 60 / 60
    case 'day':
    case 'days':
      return seconds / 60 / 60 / 24
  }
}

const parseToSeconds = (duration: t.Duration) => {
  const [numStr, unit] = duration.split(' ') as [string, t.UnitOfTime]
  const num = parseInt(numStr)
  switch (unit) {
    case 'millisecond':
    case 'milliseconds':
      return num / 1000
    case 'second':
    case 'seconds':
      return num
    case 'minute':
    case 'minutes':
      return num * 60
    case 'hour':
    case 'hours':
      return num * 60 * 60
    case 'day':
    case 'days':
      return num * 60 * 60 * 24
  }
}

export default {
  parse
}
