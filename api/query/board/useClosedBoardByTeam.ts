import {RetroBoard} from '@prisma/client'
import {useQuery} from 'react-query'
import retrospectiveService from '../../request/retrospective'

const useClosedBoardByTeam = (
  teamId: string,
  year?: string,
  month?: string,
  page?: number
) => {
  return useQuery('get-close-board-by-team', () =>
    retrospectiveService
      .getClosedRetroBoardByTeam({
        teamId,
        year: year ?? '',
        month: month ?? '',
        page: page ?? 1,
      })
      .then((res) => {
        return {
          retroBoard: res.data.retroBoard as RetroBoard[],
          retroBoardCount: res?.data?.retroBoardCount as number,
        }
      })
  )
}

export default useClosedBoardByTeam
