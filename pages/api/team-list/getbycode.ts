// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import Team from '../../../models/teamModel'
import {Team as TeamType} from '../../../types/team'
import dbConnect from '../../../utils/dbConnect'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TeamType | string>
) {
  await dbConnect()
  const {team} = req.query

  if (!team) {
    res.status(500).json('No team in query')
  }

  const teamInfo = await Team.findOne({code: team})

  if (!teamInfo) {
    res.status(404).json(team + ' Team not found')
  }

  res.status(200).json(teamInfo)
}
