import {NextApiRequest, NextApiResponse} from 'next'
import {getToken} from 'next-auth/jwt'
import prisma from '../../../prisma'

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).send('Only Put requests allowed')
  }

  const token = await getToken({req, secret})
  const {id} = req.body

  if (!token) {
    res.status(403).json('please log in')
  }

  const upsertUser = await prisma.user.update({
    where: {
      email: token!.email!,
    },
    data: {
      teamId: id!,
    },
  })
  res.status(200).json(upsertUser)
}
