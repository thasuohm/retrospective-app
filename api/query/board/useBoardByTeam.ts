import {RetroBoard} from '@prisma/client'
import {useQuery} from 'react-query'
import retrospectiveService from '../../request/retrospective'

const useBoardByTeam = (teamId: string) => {
  return useQuery('get-board-by-team', () =>
    retrospectiveService.getRetroBoardByTeam(teamId).then((res) => {
      return {
        retroBoard: res.data.retroBoard as RetroBoard[],
        retroBoardCount: res?.data?.retroBoardCount as number,
      }
    })
  )
}

export default useBoardByTeam
