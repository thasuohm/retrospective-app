// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {Team} from '@prisma/client'
import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from '../../../prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Team | string>
) {
  if (req.method !== 'GET') {
    return res.status(405).send('Only Get requests allowed')
  }

  const {id} = req.query

  if (!id) {
    res.status(500).json('No team in query')
  }

  const teamInfo = await prisma.team.findUnique({
    where: {id: id?.toString()},
  })

  if (!teamInfo) {
    res.status(404).json(id + ' Team not found')
  }

  res.status(200).json(teamInfo!)
}
