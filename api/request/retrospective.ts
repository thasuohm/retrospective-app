import axios from './axios'

const getTeamList = () => {
  return axios.get('/team-list')
}
const getRetroList = () => {}
const createRetrospective = () => {}
const updateRetrospective = () => {}
const getRetrospective = () => {}
const joinRetrospective = () => {}
const sendRetrospective = () => {}
const getRetroHistory = () => {}
const commentRetrospective = () => {}
const emojiRetrospective = () => {}

const retrospectiveService = {
  getTeamList,
  getRetroList,
  createRetrospective,
  updateRetrospective,
  getRetrospective,
  joinRetrospective,
  sendRetrospective,
  getRetroHistory,
  commentRetrospective,
  emojiRetrospective,
}

export default retrospectiveService
