import {useQuery} from 'react-query'
import {Team} from '../../types/team'
import retrospectiveService from '../request/retrospective'

const useTeam = (team: string) => {
  return useQuery('get-team', () =>
    retrospectiveService.getTeam(team).then((res) => res.data as Team)
  )
}

export default useTeam
