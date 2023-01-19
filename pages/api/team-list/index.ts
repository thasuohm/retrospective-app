// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {TeamList} from '../../../types/team'
import prisma from '../../../prisma/index'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TeamList | string>
) {
  if (req.method !== 'GET') {
    return res.status(405).send('Only Get requests allowed')
  }

  const allTeam = await prisma.team.findMany()

  res.status(200).json(allTeam)
}
