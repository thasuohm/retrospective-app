import type {NextApiRequest, NextApiResponse} from 'next'
import {getToken} from 'next-auth/jwt'
import prisma from '../../../prisma'

const secret = process.env.NEXTAUTH_SECRET

export default async function createBoard(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only Post requests allowed')
  }

  const token = await getToken({req, secret})

  if (!token) {
    return res.status(403).send('Please login before create Board')
  }

  const {title, teamId, opening, password, endDate} = req.body

  if (!title) {
    return res.status(400).send('please define Board Title')
  }

  if (!teamId) {
    return res.status(400).send('please select Team for this Board!')
  }

  const {id} = req.query

  const user = await prisma.user.findUnique({
    where: {email: token!.email?.toString()},
  })

  if (!user) {
    return res.status(404).send('User not found')
  }

  const boardInfo = await prisma.retroBoard.findUnique({
    where: {id: id?.toString()},
  })

  if (user!.id !== boardInfo?.creatorId) {
    return res.status(403).send('You are not Owner of this Board')
  }

  await prisma.retroBoard.update({
    where: {id: id?.toString()},
    data: {
      title,
      teamId,
      opening,
      password,
      endDate,
    },
  })

  res.status(200).json(`retro board: ${title} has been update!!`)
}
