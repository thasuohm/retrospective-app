import {useMutation, useQueryClient} from 'react-query'
import retrospectiveService from '../../request/retrospective'

const useCloseBoard = () => {
  const queryClient = useQueryClient()
  return useMutation(retrospectiveService.closeRetrospectiveBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries('get-board-by-id')
    },
  })
}

export default useCloseBoard
