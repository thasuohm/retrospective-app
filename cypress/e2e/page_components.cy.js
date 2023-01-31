beforeEach(() => {
  cy.visit('/')
})

describe('nav bar test', () => {
  it('should go home page', () => {
    cy.get('.text-lg').contains('RETROSPECTIVE').click()
    expect(cy.visit('/'))
  })

  it('should go history page', () => {
    cy.login()
    cy.wait('@session')

    cy.get('.text-md')
      .contains(/history/i)
      .click()
    expect(cy.visit('/history'))
  })
})

describe('switch theme', () => {
  it('switch theme correctly', () => {
    cy.get('#dark-mode-switch').click()
    expect(cy.get('#light-mode-switch'))
    cy.get('#light-mode-switch').click()
    expect(cy.get('#dark-mode-switch'))
  })
})
