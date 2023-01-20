import {RetroBoard} from '@prisma/client'
import {useQuery} from 'react-query'
import retrospectiveService from '../../request/retrospective'

const useBoardByTeam = (teamId: string) => {
  return useQuery('get-board-by-team', () =>
    retrospectiveService
      .getRetroBoardByTeam(teamId)
      .then((res) => res.data as RetroBoard[])
  )
}

export default useBoardByTeam
