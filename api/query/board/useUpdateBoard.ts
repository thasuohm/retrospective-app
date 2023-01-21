import {RetroBoard} from '@prisma/client'
import {useMutation, useQueryClient} from 'react-query'
import retrospectiveService from '../../request/retrospective'

const useUpdateBoard = ({
  boardId,
  boardInfo,
}: {
  boardId: string
  boardInfo: RetroBoard
}) => {
  const queryClient = useQueryClient()
  return useMutation(
    () => retrospectiveService.updateRetrospectiveBoard(boardId, boardInfo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('get-board-by-id')
      },
    }
  )
}

export default useUpdateBoard
