import {RetroItem} from '@prisma/client'
import {AxiosError} from 'axios'
import {useQuery} from 'react-query'
import retrospectiveService from '../../request/retrospective'

const useCommentList = (boardId: string) => {
  return useQuery<any, AxiosError>(
    'get-board-comment-list',
    () =>
      retrospectiveService.getRetrospectiveCommentList(boardId).then((res) => {
        console.log(res.data.retroItem)
        return {
          retroItem: res.data.retroItem as RetroItem[],
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

export default useCommentList
