import {useMutation, useQueryClient} from 'react-query'
import {toast} from 'react-toastify'
import {RetroItemCreate} from '../../../types/request'
import retrospectiveService from '../../request/retrospective'

const useSendBoard = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({
      boardId,
      retroItemList,
    }: {
      boardId: string
      retroItemList: RetroItemCreate[]
    }) => retrospectiveService.sendRetrospective(boardId, retroItemList),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('get-board-by-id')
        toast.success('Send your Comment Success!!')
      },
      onError: (err) => {
        console.log(err)
        queryClient.invalidateQueries('get-board-by-id')
        toast.error('Have some error Occur!!')
      },
    }
  )
}

export default useSendBoard
