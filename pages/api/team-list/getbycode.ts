// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {Team as TeamType} from '../../../types/team'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TeamType | string>
) {
  const {code} = req.query

  if (!code) {
    res.status(500).json('No team in query')
  }

  const teamInfo = await prisma?.team.findUnique({
    where: {code: code?.toString()},
  })

  if (!teamInfo) {
    res.status(404).json(code + ' Team not found')
  }

  res.status(200).json(teamInfo!)
}
