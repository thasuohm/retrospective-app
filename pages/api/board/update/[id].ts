import type {NextApiRequest, NextApiResponse} from 'next'
import {getToken} from 'next-auth/jwt'
import prisma from '../../../../prisma'
import bcrypt from 'bcrypt'

const secret = process.env.NEXTAUTH_SECRET

export default async function updateBoard(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const saltRounds = 11

  if (req.method !== 'PUT') {
    return res.status(405).send('Only Put requests allowed')
  }

  const token = await getToken({req, secret})

  if (!token) {
    return res.status(403).send('Please login before create Board')
  }

  let {teamId, password, endDate} = req.body

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

  if (!boardInfo) {
    return res.status(404).json(id + ' Board not found')
  }

  if (user!.id !== boardInfo?.creatorId) {
    return res.status(403).send('You are not Owner of this Board')
  }

  if (password || password !== '') {
    password = await bcrypt.hash(password, saltRounds)
  }

  await prisma.retroBoard.update({
    where: {id: id?.toString()},
    data: {
      teamId,
      password,
      endDate: new Date(endDate),
    },
  })

  res.status(200).json({
    boardId: boardInfo?.id,
    teamId: boardInfo.teamId,
    message: `retro board: ${id} has been update!!`,
  })
}
