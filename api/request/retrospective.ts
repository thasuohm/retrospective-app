import {RetroBoard, Team} from '@prisma/client'
import {RetroItemCreate} from '../../types/request'
import axios from './axios'

const getTeamList = () => {
  return axios.get('/team-list')
}

const addTeam = (team: Team) => {
  return axios.post('/team-list/add', team)
}

const getTeam = (id: string) => {
  return axios.get('/team-list/getbyid?id=' + id)
}

const getRetroBoardByTeam = (teamId: string) => {
  return axios.get('/board/team/' + teamId)
}

const getClosedRetroBoardByTeam = (
  teamId: string,
  month: string = '',
  year: string = '',
  page: number = 1
) => {
  return axios.get('/board/team/' + teamId, {
    params: {opening: false, month, year, page},
  })
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
  return axios.put('/board/close/' + boardId)
}

const joinRetrospective = (boardId: string, password: string) => {
  return axios.post('/board/join/' + boardId, {password})
}
const sendRetrospective = (
  boardId: string,
  retroItemList: RetroItemCreate[]
) => {
  return axios.post('/board/senditem?id=' + boardId, retroItemList)
}

const getRetrospectiveCommentList = (boardId: string) => {
  return axios.get('/board/comment-list/' + boardId)
}

const getRetroHistory = () => {}
const commentRetrospective = () => {}
const emojiRetrospective = () => {}

const retrospectiveService = {
  getTeamList,
  addTeam,
  getTeam,
  getRetroBoardByTeam,
  getClosedRetroBoardByTeam,
  createRetrospectiveBoard,
  updateRetrospectiveBoard,
  getRetrospectiveBoardById,
  closeRetrospectiveBoard,
  joinRetrospective,
  sendRetrospective,
  getRetrospectiveCommentList,
  getRetroHistory,
  commentRetrospective,
  emojiRetrospective,
}

export default retrospectiveService
