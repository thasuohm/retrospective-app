import type {NextApiRequest, NextApiResponse} from 'next'
import {getToken} from 'next-auth/jwt'
import prisma from '../../../prisma'
import bcrypt from 'bcrypt'
import moment from 'moment'

const secret = process.env.NEXTAUTH_SECRET

export default async function createBoard(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const saltRounds = 11

  if (req.method !== 'POST') {
    return res.status(405).send('Only Post requests allowed')
  }

  const token = await getToken({req, secret})

  if (!token) {
    return res.status(403).send('Please login before create Board')
  }

  let {title, teamId, password, endDate, anonymous} = req.body

  if (!title) {
    return res.status(400).send('please define Board Title')
  }

  if (!teamId) {
    return res.status(400).send('please select Team for this Board!')
  }

  const user = await prisma.user.findUnique({
    where: {email: token!.email?.toString()},
  })

  if (!user) {
    return res.status(404).send('User not found')
  }

  if (password || password !== '') {
    password = await bcrypt.hash(password, saltRounds)
  }

  const localTimeOffset = new Date(endDate).getTimezoneOffset()

  await prisma.retroBoard.create({
    data: {
      title,
      teamId,
      opening: true,
      password,
      endDate: new Date(endDate),
      anonymous,
      creatorId: user!.id,
    },
  })

  res.status(200).json(`retro board: ${title} has been create!!`)
}
