import {RetroBoard} from '@prisma/client'
import {useMutation, useQueryClient} from 'react-query'
import {useSocket} from '../../../contexts/socket'
import retrospectiveService from '../../request/retrospective'

const useUpdateBoard = () => {
  const queryClient = useQueryClient()
  const {socket}: any = useSocket()
  return useMutation(
    ({boardId, boardInfo}: {boardId: string; boardInfo: any}) =>
      retrospectiveService.updateRetrospectiveBoard(boardId, boardInfo),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries('get-board-by-id')
        socket.emit('updateBoard', {boardId: res.data.boardId})
      },
    }
  )
}

export default useUpdateBoard
