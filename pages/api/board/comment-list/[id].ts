import type {NextApiRequest, NextApiResponse} from 'next'
import {getToken} from 'next-auth/jwt'
import prisma from '../../../../prisma'

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).send({message: 'Only Get requests allowed'})
  }

  const {id} = req.query
  const token = await getToken({req, secret})

  if (!token) {
    return res.status(401).send({message: 'Please login'})
  }

  if (!id) {
    res.status(500).json({message: 'No BoardId in query'})
  }

  const retroBoard = await prisma.retroBoard.findUnique({
    where: {id: id?.toString()},
  })

  if (!retroBoard) {
    res.status(404).json({message: id + ' Board not found'})
  }

  let retroItem = await prisma.retroItem.findMany({
    where: {boardId: id?.toString()},
    include: {
      sender: {
        select: {
          email: retroBoard?.anonymous ? false : true,
          status: true,
        },
      },
    },
  })

  retroItem.map((item: any) => {
    let noSender = item
    delete noSender['senderId']

    return noSender
  })

  const user = await prisma.user.findUnique({
    where: {email: token!.email?.toString()},
  })

  if (!user) {
    return res.status(404).send({message: 'User not found'})
  }

  if (
    user.id !== retroBoard!.creatorId &&
    retroBoard!.password !== null &&
    retroBoard!.password !== ''
  ) {
    const permission = await prisma.retroBoardPermission.findFirst({
      where: {boardId: retroBoard!.id, userId: user!.id},
    })

    if (!permission) {
      return res.status(401).send({
        message: 'Please enter password of this board before',
      })
    }
  }

  res.status(200).json({
    retroItem,
  })
}
