import {useMutation, useQueryClient} from 'react-query'
import {toast} from 'react-toastify'
import retrospectiveService from '../../request/retrospective'

const useJoinBoard = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({boardId, password}: {boardId: string; password: string}) =>
      retrospectiveService.joinRetrospective(boardId, password),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('get-board-by-id')
        toast.success('You are Joined!!')
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message)
      },
    }
  )
}

export default useJoinBoard
