import {RetroBoard, RetroItem} from '@prisma/client'
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
  return axios.get('/board/getbyid?id=' + boardId)
}

const closeRetrospectiveBoard = (boardId: string) => {
  return axios.put('/board/close?id=' + boardId)
}

const joinRetrospective = (boardId: string, password: string) => {
  return axios.post('/board/join?id=' + boardId, {password})
}
const sendRetrospective = (boardId: string, retroItem: RetroItem[]) => {
  return axios.post('/board/senditem?id=' + boardId, retroItem)
}
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
  closeRetrospectiveBoard,
  joinRetrospective,
  sendRetrospective,
  getRetroHistory,
  commentRetrospective,
  emojiRetrospective,
}

export default retrospectiveService
