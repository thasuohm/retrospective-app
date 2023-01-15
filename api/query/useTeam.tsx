// Access the client

import {useQuery} from 'react-query'
import retrospectiveService from '../request/retrospective'

const useTeam = (team: string) => {
  return useQuery('get-team', () => retrospectiveService.getTeam(team))
}

export default useTeam
