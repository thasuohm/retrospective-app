import {RetroBoard, Team} from '@prisma/client'
import {RetroBoardCreate, RetroItemCreate} from '../../types/request'
import axios from './axios'

const getTeamList = () => {
  return axios.get('/team-list')
}

const addTeam = (team: Team) => {
  return axios.post('/team-list/add', team)
}

const getTeam = (id: string) => {
  return axios.get('/team-list/' + id)
}

const getRetroBoardByTeam = (teamId: string) => {
  return axios.get('/board/team/' + teamId)
}

const getClosedRetroBoardByTeam = ({
  teamId,
  year = '',
  month = '',
  page = 1,
}: {
  teamId: string
  year: string
  month: string
  page: number
}) => {
  return axios.get('/board/team/' + teamId, {
    params: {opening: false, year, month, page},
  })
}

const createRetrospectiveBoard = (boardInfo: RetroBoardCreate) => {
  return axios.post('/board/create', {...boardInfo})
}
const updateRetrospectiveBoard = (boardId: string, boardInfo: RetroBoard) => {
  return axios.put('/board/update/' + boardId, boardInfo)
}
const getRetrospectiveBoardById = (boardId: string) => {
  return axios.get('/board/' + boardId)
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

const commentHistoryRetrospective = (itemId: string, comment: string) => {
  return axios.put('/board/comment/' + itemId, {comment})
}
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
  commentHistoryRetrospective,
  emojiRetrospective,
}

export default retrospectiveService
