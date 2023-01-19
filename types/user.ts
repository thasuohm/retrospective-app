import {Team} from './team'

export interface User {
  id: any
  email: string
  name: string
  team?: Team
  teamId?: string
  role: string
  status: string
  createdAt: Date
}
