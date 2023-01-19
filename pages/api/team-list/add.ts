import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from '../../../prisma'

export default async function addTeam(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only Post requests allowed')
  }

  const {id, name, description} = req.body

  await prisma.team.create({data: {id, name, description}})

  res.status(200).json(name + ' Team has been added')
}
