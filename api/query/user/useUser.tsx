import {User} from '@prisma/client'
import {useQuery} from 'react-query'
import userService from '../../request/user'

const useUser = (enabled = true) => {
  return useQuery(
    'get-user',
    () => userService.getUser().then((res) => res.data as User),
    {
      enabled,
    }
  )
}

export default useUser
