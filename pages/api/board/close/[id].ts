import type {NextApiRequest, NextApiResponse} from 'next'
import {getToken} from 'next-auth/jwt'
import prisma from '../../../../prisma'

const secret = process.env.NEXTAUTH_SECRET

export default async function closeBoard(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).send('Only Put requests allowed')
  }

  const token = await getToken({req, secret})

  if (!token) {
    return res.status(403).send('Please login')
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

  if (!boardInfo) {
    return res.status(404).json(id + ' Board not found')
  }

  if (user!.id !== boardInfo?.creatorId) {
    return res.status(403).send('You are not Owner of this Board')
  }

  if (!boardInfo.opening) {
    return res.status(302).json('This Board already Close')
  }

  await prisma.retroBoard.update({
    where: {id: id?.toString()},
    data: {
      opening: false,
    },
  })

  res.status(200).json(`retro board: ${id} has been close!!`)
}
