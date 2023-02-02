import type {NextApiRequest, NextApiResponse} from 'next'
import {getToken} from 'next-auth/jwt'
import prisma from '../../../../prisma'
import bcrypt from 'bcrypt'

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).send({message: 'Only Post requests allowed'})
  }

  const {id} = req.query
  const token = await getToken({req, secret})
  const {password} = req.body

  if (!token) {
    return res.status(403).send({message: 'Please login before'})
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

  const user = await prisma.user.findUnique({
    where: {email: token!.email?.toString()},
  })

  if (!user) {
    return res.status(404).send({message: 'User not found'})
  }

  if (
    retroBoard!.password &&
    !(await bcrypt.compare(password, retroBoard!.password))
  ) {
    return res.status(500).send({message: 'Wrong Password :('})
  }

  await prisma.retroBoardPermission.create({
    data: {boardId: retroBoard!.id, userId: user!.id},
  })

  res
    .status(200)
    .json({message: 'you has been join to ' + retroBoard!.id + ' Board :)'})
}
