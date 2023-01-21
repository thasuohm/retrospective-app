import {RetroBoard} from '@prisma/client'
import {useQuery} from 'react-query'
import retrospectiveService from '../../request/retrospective'

const useBoardById = (boardId: string) => {
  return useQuery('get-board-by-id', () =>
    retrospectiveService
      .getRetrospectiveBoardById(boardId)
      .then((res) => res.data as RetroBoard)
  )
}

export default useBoardById