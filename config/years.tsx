import moment from 'moment'

export const currentYear = moment().year()

const range = (start: number, stop: number, step: number) =>
  Array.from({length: (stop - start) / step + 1}, (_, i) => start + i * step)

export const yearArrObject: {value: string; label: string}[] = range(
  currentYear - 20,
  currentYear + 20,
  1
).map((item) => {
  return {value: item.toString(), label: item.toString()}
})
