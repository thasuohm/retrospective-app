// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from '../../../prisma/index'
import {Team} from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Team[] | string>
) {
  if (req.method !== 'GET') {
    return res.status(405).send('Only Get requests allowed')
  }

  const allTeam = await prisma.team.findMany()

  res.status(200).json(allTeam)
}
