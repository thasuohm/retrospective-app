// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {RetroBoard} from '@prisma/client'
import type {NextApiRequest, NextApiResponse} from 'next'
import {getToken} from 'next-auth/jwt'
import prisma from '../../../prisma'

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RetroBoard | string>
) {
  if (req.method !== 'GET') {
    return res.status(405).send('Only Get requests allowed')
  }

  const {id} = req.query
  const token = await getToken({req, secret})

  if (!token) {
    return res.status(403).send('Please login before')
  }

  if (!id) {
    res.status(500).json('No BoardId in query')
  }

  const retroBoard = await prisma.retroBoard.findUnique({
    where: {id: id?.toString()},
    include: {
      creator: {
        select: {
          email: true,
        },
      },
      team: true,
    },
  })

  if (!retroBoard) {
    res.status(404).json(id + ' Board not found')
  }

  const user = await prisma.user.findUnique({
    where: {email: token!.email?.toString()},
  })

  if (!user) {
    return res.status(404).send('User not found')
  }

  if (
    user.id !== retroBoard!.creatorId &&
    (retroBoard!.password !== null || retroBoard!.password !== '')
  ) {
    const permission = await prisma.retroBoardPermission.findFirst({
      where: {boardId: retroBoard!.id, userId: user!.id},
    })

    if (!permission) {
      return res
        .status(403)
        .send('Please enter password of this board before join')
    }
  }

  res.status(200).json(retroBoard!)
}
