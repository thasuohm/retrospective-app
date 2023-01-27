import {BoardType} from '@prisma/client'

export interface RetroItemCreate {
  senderId: string | null
  boardId: string
  type: BoardType
  content: string
}
