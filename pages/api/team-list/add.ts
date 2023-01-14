import type {NextApiRequest, NextApiResponse} from 'next'
import Team from '../../../models/teamModel'
import dbConnect from '../../../utils/dbConnect'

export default async function addTeam(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect()
  await Team.create(req.body)

  res.status(200).json(req.body.name + ' Team has been added')
}
