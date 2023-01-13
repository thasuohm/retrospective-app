// Access the client

import {useQuery} from 'react-query'
import retrospectiveService from '../request/retrospective'

const useTeamList = () => {
  return useQuery('get-team-list', retrospectiveService.getTeamList)
}

export default useTeamList
