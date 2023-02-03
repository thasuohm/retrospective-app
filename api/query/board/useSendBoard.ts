import {useMutation, useQueryClient} from 'react-query'
import {toast} from 'react-toastify'
import {useSocket} from '../../../contexts/socket'
import {RetroItemCreate} from '../../../types/request'
import retrospectiveService from '../../request/retrospective'

const useSendBoard = () => {
  const queryClient = useQueryClient()
  const {socket}: any = useSocket()
  return useMutation(
    ({
      boardId,
      retroItemList,
    }: {
      boardId: string
      retroItemList: RetroItemCreate[]
    }) => retrospectiveService.sendRetrospective(boardId, retroItemList),
    {
      onSuccess: (res) => {
        socket.emit('updateBoard', {boardId: res.data.boardId, alert: false})
        queryClient.invalidateQueries('get-board-by-id')
        toast.success('Send your Comment Success!!')
      },
      onError: (err) => {
        queryClient.invalidateQueries('get-board-by-id')
        toast.error('Have some error Occur!!')
      },
    }
  )
}

export default useSendBoard
