import {NextApiRequest, NextApiResponse} from 'next'
import {getToken} from 'next-auth/jwt'
import prisma from '../../../prisma'

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).send('Only Get requests allowed')
  }

  const token = await getToken({req, secret})

  if (!token) {
    res.status(403).json('please log in')
  }

  const upsertUser = await prisma.user.upsert({
    where: {
      email: token!.email!,
    },
    update: {},
    create: {
      email: token!.email!,
      name: token!.name!,
      role: 'MEMBER',
      status: 'ACTIVE',
      team: {},
    },
  })
  res.status(200).json(upsertUser)
}
