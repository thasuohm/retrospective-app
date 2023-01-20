import {useMutation, useQueryClient} from 'react-query'
import userService from '../../request/user'

const useUserChangeTeam = () => {
  const queryClient = useQueryClient()
  return useMutation(userService.changeTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries('get-user')
    },
  })
}

export default useUserChangeTeam
