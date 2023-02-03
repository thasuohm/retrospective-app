// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {RetroBoard} from '@prisma/client'
import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from '../../../../prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).send('Only Get requests allowed')
  }

  let {id, opening, month, year, page} = req.query

  if (!id) {
    res.status(500).json('No team in query')
  }

  const mockEndDate = `${
    !year || isNaN(+year) || year!.length < 1 ? '3000' : year
  }-${
    !month || isNaN(+month) || month!.length < 1
      ? '12'
      : ('0' + month).slice(-2)
  }-31`

  const mockStartDate = `${
    !year || isNaN(+year) || year!.length < 1 ? '2000' : year
  }-${
    !month || isNaN(+month) || month!.length < 1
      ? '01'
      : ('0' + month).slice(-2)
  }-01`

  const retroBoard = await prisma.retroBoard.findMany({
    where: {
      teamId: id?.toString(),
      opening: opening === 'true' || !opening ? true : false,
      createdAt: {
        lte: new Date(mockEndDate),
        gte: new Date(mockStartDate),
      },
    },
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
    where: {
      teamId: id?.toString(),
      opening: opening === 'true' || !opening ? true : false,
      createdAt: {
        lte: new Date(mockEndDate),
        gte: new Date(mockStartDate),
      },
    },
    _count: true,
  })

  if (!retroBoard) {
    res.status(404).json(id + ' Team not found')
  }

  res.status(200).json({retroBoard, retroBoardCount: retroBoardCount._count})
}
