import type {NextApiRequest, NextApiResponse} from 'next'
import {getToken} from 'next-auth/jwt'
import prisma from '../../../prisma'

const secret = process.env.NEXTAUTH_SECRET

export default async function sendItem(
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

  const {type, content} = req.body
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

  if (!boardInfo) {
    return res.status(404).json(id + ' Board not found')
  }

  if (!boardInfo.opening) {
    return res.status(403).send('This Board has been Close :(')
  }

  await prisma.retroItem.create({
    data: {
      type,
      content,
      boardId: boardInfo.id,
      pickup: false,
      senderId: user.id,
    },
  })

  res.status(200).json(`your Retro content has been sent!!`)
}