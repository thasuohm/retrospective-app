import getbyid from '../../pages/api/team-list/getbyid'

it('test env', () => {
  expect(process.env.NEXT_PUBLIC_BASE_URL).toBeDefined
})

it('get correct team', async () => {
  const req = {
    method: 'GET',
    query: {id: 'dev'},
  }

  const json = jest.fn()

  const res = {
    json,
    status: jest.fn().mockReturnThis(),
  }
  await getbyid(req, res)
  expect(json.mock.calls[0][0].name).toBe('Developer')
})

// it('post correct team', async () => {
//   const teamObj = {
//     id: 'tester',
//     name: 'Tester',
//     description: 'Test Anything Developer do!!',
//   }

//   await retrospectiveService
//     .addTeam(teamObj)
//     .then((data) => expect(data).toBe(teamObj.name + ' Team has been added'))
// })
