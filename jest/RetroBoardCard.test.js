import RetroBoardCard from '../components/cards/RetroBoardCard'
import {render} from '@testing-library/react'
import React from 'react'
jest.mock('next-auth/react')

jest.mock('next/router', () => require('next-router-mock'))

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react')
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: {name: 'test', email: 'test@test.com', image: ''},
  }
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return {data: mockSession, status: 'authenticated'} // return type is [] in v3 but changed to {} in v4
    }),
  }
})
const boardInfo = [
  {
    id: '1',
    title: 'test board',
    teamId: 'dev',
    creatorId: '1',
    anonymous: true,
    opening: true,
    password: null,
    createdAt: null,
    team: {
      name: 'Developer',
    },
    creator: {
      email: 'test@test.com',
    },
    endDate: null,
  },
  {
    id: '2',
    title: 'test board',
    teamId: 'dev',
    creatorId: '1',
    anonymous: true,
    opening: true,
    password: null,
    createdAt: null,
    team: {
      name: 'Developer',
    },
    creator: {
      email: 'test@test.com',
    },
    endDate: null,
  },
  {
    id: '3',
    title: 'test board',
    teamId: 'dev',
    creatorId: '1',
    anonymous: true,
    opening: false,
    password: null,
    createdAt: null,
    team: {
      name: 'Developer',
    },
    creator: {
      email: 'test@test.com',
    },
    endDate: null,
  },
]

describe('all boardInfo correct data', () => {
  test.each(boardInfo)(`board item %j`, (boardItem) => {
    expect(boardItem.title).toBeDefined()
    expect(boardItem.teamId).toBeDefined()
    expect(boardItem.creator.email).toBeDefined()
  })
})

it('should show correct info', () => {
  for (let i = 0; i < boardInfo.length; i++) {
    const retroBoardCard = render(<RetroBoardCard retroBoard={boardInfo[i]} />)
    expect(retroBoardCard.getAllByText('Title: ' + boardInfo[i].title))
    expect(
      retroBoardCard.getAllByText('Creator: ' + boardInfo[i].creator.email)
    )
    expect(retroBoardCard.getAllByText('Team: ' + boardInfo[i].team.name))
  }
})

it('should correct board status', () => {
  for (let i = 0; i < boardInfo.length; i++) {
    const retroBoardCard = render(<RetroBoardCard retroBoard={boardInfo[i]} />)
    expect(
      retroBoardCard.getAllByText(boardInfo[i].opening ? /OPENING/i : /CLOSED/i)
    )

    expect(
      retroBoardCard.getAllByText(
        boardInfo[i].opening ? /Let's write !!/i : /See Result !!/i
      )
    )
  }
})
