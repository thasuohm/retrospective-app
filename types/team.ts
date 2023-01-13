export interface Team {
  id: any
  code: string
  name: string
  description: string
}

export interface TeamList extends Array<Team> {}
