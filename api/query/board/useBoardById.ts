import {useQuery} from 'react-query'
import retrospectiveService from '../../request/retrospective'

const useBoardById = (boardId: string) => {
  return useQuery(
    'get-board-by-id',
    () =>
      retrospectiveService.getRetrospectiveBoardById(boardId).then((res) => {
        return {
          retroBoard: res.data.retroBoard,
          timeLeft: res.data.timeLeft as number,
          retroItemCount: res.data.retroItemCount._count as number,
          isOwner: res.data.isOwner as boolean,
        }
      }),
    {
      enabled: boardId ? true : false,
    }
  )
}

export default useBoardById
