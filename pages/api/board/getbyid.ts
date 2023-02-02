import moment from 'moment'
import type {NextApiRequest, NextApiResponse} from 'next'
import {getToken} from 'next-auth/jwt'
import prisma from '../../../prisma'

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
    res.status(404).json({message: id + ' Board not found'})
  }

  const retroItemCount = await prisma.retroItem.aggregate({
    where: {boardId: id?.toString()},
    _count: true,
  })

  const user = await prisma.user.findUnique({
    where: {email: token!.email?.toString()},
  })

  if (!user) {
    return res.status(404).send({message: 'User not found'})
  }

  let timeLeft = 0
  let localTimeOffset = 0

  if (retroBoard?.endDate) {
    const now = moment()
    console.log(now, moment(retroBoard?.endDate))
    timeLeft = moment(retroBoard?.endDate).diff(now, 'seconds')

    localTimeOffset = new Date(retroBoard?.endDate).getTimezoneOffset()
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
      return res.status(403).send({
        retroBoard: {
          title: retroBoard?.title,
          creator: {
            email: retroBoard?.creator.email,
          },
          endDate: moment(retroBoard?.endDate)
            .add(-localTimeOffset, 'm')
            .toDate(),
        },
        message: 'Please enter password of this board before join',
      })
    }
  }

  let isOwner = retroBoard?.creatorId === user.id

  res.status(200).json({
    retroBoard: {
      ...retroBoard,
      endDate: moment(retroBoard?.endDate).add(-localTimeOffset, 'm').toDate(),
    },
    timeLeft,
    retroItemCount,
    isOwner,
  })
}
