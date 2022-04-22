import * as t from 'src/types'

export const parse = (duration: t.Duration): number => {
  const [numStr, unit] = duration.split(' ') as [string, t.UnitOfTime]
  const num = parseInt(numStr)
  switch (unit) {
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
  return 0
}

export default {
  parse
}
