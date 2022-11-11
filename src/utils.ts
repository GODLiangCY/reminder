const minToMs = 60 * 1000
const secToMs = 1000
const hrToMs = 60 * 60 * 1000

export function parseInterval(val: string | number) {
  if (typeof val === 'number')
    return minToMs * val

  const value = Number(val.match(/(.*?)([a-z]*)$/)[1])
  const suffix = val.match(/(.*?)([a-z]*)$/)[2]
  if (!suffix)
    return value * minToMs

  switch (suffix) {
    case 'ms':
      return value
    case 's':
    case 'sec':
    case 'secs':
      return value * secToMs
    case 'm':
    case 'mins':
    case 'min':
      return value * minToMs
    case 'h':
    case 'hr':
    case 'hrs':
      return value * hrToMs
    default:
      break
  }

  throw new TypeError('The interval value is not valid')
}

export async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
