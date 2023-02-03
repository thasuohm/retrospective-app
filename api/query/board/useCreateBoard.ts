import {useRouter} from 'next/router'
import {useMutation, useQueryClient} from 'react-query'
import {toast} from 'react-toastify'
import {RetroBoardCreate} from '../../../types/request'
import retrospectiveService from '../../request/retrospective'

const useCreateBoard = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation(
    (data: RetroBoardCreate) =>
      retrospectiveService.createRetrospectiveBoard(data),
    {
      onSuccess: (res) => {
        router.push(res.data.boardId)
        toast.success('Create Board Success')
        queryClient.invalidateQueries('get-board-by-id')
      },
    }
  )
}

export default useCreateBoard
