// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import Team from '../../../models/teamModel'
import {TeamList} from '../../../types/team'
import dbConnect from '../../../utils/dbConnect'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TeamList>
) {
  await dbConnect()
  const allTeam = await Team.find({})

  res.status(200).json(allTeam)
}
