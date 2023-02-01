import {RetroBoard} from '@prisma/client'
import {useMutation, useQueryClient} from 'react-query'
import retrospectiveService from '../../request/retrospective'

const useUpdateBoard = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({boardId, boardInfo}: {boardId: string; boardInfo: any}) =>
      retrospectiveService.updateRetrospectiveBoard(boardId, boardInfo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('get-board-by-id')
      },
    }
  )
}

export default useUpdateBoard
