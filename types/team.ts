export interface Team {
  id: string
  name: string
  description: string
}

export interface TeamList extends Array<Team> {}
