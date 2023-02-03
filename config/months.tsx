export const monthsArr = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const monthsArrObj = monthsArr.map((month, idx) => {
  return {label: month, value: (idx + 1).toString()}
})
