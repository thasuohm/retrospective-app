import {AxiosError} from 'axios'
import {useQuery} from 'react-query'
import retrospectiveService from '../../request/retrospective'

const useBoardById = (boardId: string) => {
  return useQuery<any, AxiosError>(
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
      onError: (error) => {
        return error
      },
      enabled: boardId ? true : false,
      retry: 0,
    }
  )
}

export default useBoardById
