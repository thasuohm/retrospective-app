import type {NextApiRequest, NextApiResponse} from 'next'
import {getToken} from 'next-auth/jwt'
import prisma from '../../../../prisma'

const secret = process.env.NEXTAUTH_SECRET

export default async function commentHistory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).send({message: 'Only Put requests allowed'})
  }

  const token = await getToken({req, secret})

  if (!token) {
    return res.status(401).send({message: 'Please login'})
  }

  const {id} = req.query
  const {comment} = req.body

  const user = await prisma.user.findUnique({
    where: {email: token!.email?.toString()},
  })

  if (!user) {
    return res.status(404).send({message: 'User not found'})
  }

  const retroItem = await prisma.retroItem.findUnique({
    where: {id: id?.toString()},
  })

  const boardInfo = await prisma.retroBoard.findUnique({
    where: {id: retroItem?.boardId?.toString()},
  })

  if (!boardInfo) {
    return res.status(404).json({message: 'Board not found'})
  }

  if (user!.id !== boardInfo?.creatorId) {
    return res.status(403).send({message: 'You are not Owner of this Board'})
  }

  const item = await prisma.retroItem.update({
    where: {id: id?.toString()},
    data: {
      comment: comment?.toString(),
    },
  })

  console.log(item, comment)

  res.status(200).json({message: `${id} comment has been add!!`})
}
