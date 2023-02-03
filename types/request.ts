import {BoardType} from '@prisma/client'

export interface RetroItemCreate {
  senderId: string | null
  boardId: string
  type: BoardType
  content: string
}

export interface RetroBoardCreate {
  teamId: string
  title: string
  anonymous: boolean
  endDate: string
  password: string
}
