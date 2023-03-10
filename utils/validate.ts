export const isValidObjectId = (str: string): boolean => {
  // An ObjectId is a 24-character hexadecimal string
  const regex = /^[0-9a-fA-F]{24}$/
  return regex.test(str)
}
