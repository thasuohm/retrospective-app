import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from '../../../prisma'

export default async function addTeam(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {code, name, description} = req.body

  await prisma.team.create({data: {code, name, description}})

  res.status(200).json(name + ' Team has been added')
}
