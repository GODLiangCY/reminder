const minToMs = 60 * 1000
const secToMs = 1000
const hrToMs = 60 * 60 * 1000

export function parseInterval(val: string | number) {
  if (typeof val === 'number')
    return minToMs * val

  if (val.endsWith('ms')) {
    val = val.slice(0, -2)
    const ms = Number(val)
    return ms
  }
  else if (val.endsWith('sec')) {
    val = val.slice(0, -3)
    const ms = Number(val) * secToMs
    return ms
  }
  else if (val.endsWith('secs')) {
    val = val.slice(0, -4)
    const ms = Number(val) * secToMs
    return ms
  }
  else if (val.endsWith('min')) {
    val = val.slice(0, -3)
    const ms = Number(val) * minToMs
    return ms
  }
  else if (val.endsWith('mins')) {
    val = val.slice(0, -4)
    const ms = Number(val) * minToMs
    return ms
  }
  else if (val.endsWith('hr')) {
    val = val.slice(0, -2)
    const ms = Number(val) * hrToMs
    return ms
  }
  else if (val.endsWith('hrs')) {
    val = val.slice(0, -3)
    const ms = Number(val) * hrToMs
    return ms
  }
  else if (!isNaN(Number(val))) {
    return Number(val) * minToMs
  }
  else { throw new TypeError('The interval value is not valid') }
}

export async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
