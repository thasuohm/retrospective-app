import RetroBoardCard from '../components/cards/RetroBoardCard'
import {render} from '@testing-library/react'
import React from 'react'

jest.mock('next/router', () => require('next-router-mock'))

it('should show correct info', () => {
  const boardInfo = {
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
  }

  const retroBoardCard = render(<RetroBoardCard retroBoard={boardInfo} />)

  expect(retroBoardCard.getAllByText('Title: test board'))
})
