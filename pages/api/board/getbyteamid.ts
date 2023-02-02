// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {RetroBoard} from '@prisma/client'
import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from '../../../prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).send('Only Get requests allowed')
  }

  const {id} = req.query

  if (!id) {
    res.status(500).json('No team in query')
  }

  const retroBoard = await prisma.retroBoard.findMany({
    where: {teamId: id?.toString(), opening: true},
    include: {
      creator: {
        select: {
          email: true,
        },
      },
      team: true,
    },
  })

  const retroBoardCount = await prisma.retroBoard.aggregate({
    where: {teamId: id?.toString(), opening: true},
    _count: true,
  })

  if (!retroBoard) {
    res.status(404).json(id + ' Team not found')
  }

  res.status(200).json({retroBoard, retroBoardCount: retroBoardCount._count})
}
