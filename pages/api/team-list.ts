// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {TeamList} from '../../types/team'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TeamList>
) {
  res
    .status(200)
    .json([
      {id: 1, code: 'dev', name: 'Developer', description: 'dev something'},
    ])
}
