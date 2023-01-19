import axios from './axios'

const getUser = () => {
  return axios.get('/user')
}

const changeTeam = (id: string) => {
  return axios.put('/user/changeteam', {
    id,
  })
}

const userService = {
  getUser,
  changeTeam,
}

export default userService
