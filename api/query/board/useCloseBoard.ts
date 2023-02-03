import {useMutation, useQueryClient} from 'react-query'
import {useSocket} from '../../../contexts/socket'
import retrospectiveService from '../../request/retrospective'

const useCloseBoard = () => {
  const queryClient = useQueryClient()
  const {socket}: any = useSocket()
  return useMutation(retrospectiveService.closeRetrospectiveBoard, {
    onSuccess: (res) => {
      socket.emit('updateBoard', {
        boardId: res.data.boardId,
        teamId: res.data.teamId,
      })
      queryClient.invalidateQueries('get-board-by-id')
    },
  })
}

export default useCloseBoard
