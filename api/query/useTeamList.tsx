import {useQuery} from 'react-query'
import {TeamList} from '../../types/team'
import retrospectiveService from '../request/retrospective'

const useTeamList = () => {
  return useQuery('get-team-list', async () => {
    return await retrospectiveService
      .getTeamList()
      .then((res) => res.data as TeamList)
  })
}

export default useTeamList
