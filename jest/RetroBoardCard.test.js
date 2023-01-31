import RetroBoardCard from '../components/cards/RetroBoardCard'
import {render} from '@testing-library/react'
import React from 'react'

jest.mock('next/router', () => require('next-router-mock'))

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
]

it('show correct item', () => {
  for (let i = 0; i < boardInfo.length; i++) {
    expect(boardInfo[i].creator.email).toBeDefined()
  }
})

it('should show correct info', () => {
  for (let i = 0; i < boardInfo.length; i++) {
    const retroBoardCard = render(<RetroBoardCard retroBoard={boardInfo[i]} />)
    expect(retroBoardCard.getAllByText('Title: ' + boardInfo[i].title))
    expect(
      retroBoardCard.getAllByText('Creator: ' + boardInfo[i].creator.email)
    )
    expect(retroBoardCard.getAllByText('Team: ' + boardInfo[i].team.name))

    expect(retroBoardCard.getAllByText(boardInfo[i].opening ? 'OPENING' : 'CLOSED'))
  }
})
