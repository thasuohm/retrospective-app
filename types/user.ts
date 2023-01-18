import {Team} from './team'

export interface User {
  id: any
  email: string
  name: string
  team: Team
  role: string
  status: string
  createdAt: Date
}
