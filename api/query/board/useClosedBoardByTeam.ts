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
      .getClosedRetroBoardByTeam(teamId, month, year, page)
      .then((res) => {
        console.log(res?.data?.retroBoard)
        return {
          retroBoard: res.data.retroBoard as RetroBoard[],
          retroBoardCount: res?.data?.retroBoardCount as number,
        }
      })
  )
}

export default useClosedBoardByTeam
