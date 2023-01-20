import {Team} from '@prisma/client'
import {useQuery} from 'react-query'
import retrospectiveService from '../../request/retrospective'

const useTeamList = () => {
  return useQuery('get-team-list', async () => {
    return await retrospectiveService
      .getTeamList()
      .then((res) => res.data as Team[])
  })
}

export default useTeamList
