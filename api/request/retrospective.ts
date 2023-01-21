import {RetroBoard} from '@prisma/client'
import axios from './axios'

const getTeamList = () => {
  return axios.get('/team-list')
}

const getTeam = (id: string) => {
  return axios.get('/team-list/getbyid?id=' + id)
}

const getRetroBoardByTeam = (teamId: string) => {
  return axios.get('/board/getbyteamid?id=' + teamId)
}

const createRetrospectiveBoard = (boardInfo: RetroBoard) => {
  return axios.post('/board/create', {...boardInfo, opening: true})
}
const updateRetrospectiveBoard = (boardId: string, boardInfo: RetroBoard) => {
  return axios.put('/board/update?id=' + boardId, boardInfo)
}
const getRetrospectiveBoardById = (boardId: string) => {
  return axios.get('/board/getboardbyid?id=' + boardId)
}
const joinRetrospective = () => {}
const sendRetrospective = () => {}
const getRetroHistory = () => {}
const commentRetrospective = () => {}
const emojiRetrospective = () => {}

const retrospectiveService = {
  getTeamList,
  getTeam,
  getRetroBoardByTeam,
  createRetrospectiveBoard,
  updateRetrospectiveBoard,
  getRetrospectiveBoardById,
  joinRetrospective,
  sendRetrospective,
  getRetroHistory,
  commentRetrospective,
  emojiRetrospective,
}

export default retrospectiveService
