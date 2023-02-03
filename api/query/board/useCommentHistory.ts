import {useMutation, useQueryClient} from 'react-query'
import {toast} from 'react-toastify'
import retrospectiveService from '../../request/retrospective'

const useCommentHistory = () => {
  const queryClient = useQueryClient()
  return useMutation(
    ({id, comment}: {id: string; comment: string}) =>
      retrospectiveService.commentHistoryRetrospective(id, comment),
    {
      onSuccess: (res) => {
        toast.success('Comment has been save')
        queryClient.invalidateQueries('get-board-comment-list')
      },
    }
  )
}

export default useCommentHistory
