import {RetroBoard} from '@prisma/client'
import {useQuery} from 'react-query'
import retrospectiveService from '../../request/retrospective'

const useBoardById = (boardId: string) => {
  return useQuery('get-board-by-id', () =>
    retrospectiveService.getRetrospectiveBoardById(boardId).then((res) => {
      return {
        retroBoard: res.data.retroBoard as RetroBoard,
        timeLeft: res.data.timeLeft as number,
      }
    })
  )
}

export default useBoardById
