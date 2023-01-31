beforeEach(() => {
  cy.visit('/')
})

describe('select user team page', () => {
  it('should show correct home page', () => {
    if (cy.contains('Select')) {
      cy.get('button')
        .contains(/search/i)
        .click()

      expect(cy.get(/please select your team!!/i))
    }
  })

  it('should select correct team board list', () => {
    cy.login()
    cy.wait('@session')

    cy.get('#team-select').click()
    cy.get('#react-select-team-select-option-0').click()
    cy.get('button')
      .contains(/search/i)
      .click()

    expect(cy.visit('/retro-list/dev'))
  })

  it('should show default team', () => {
    cy.login()
    cy.wait('@session')

    expect(cy.get('#team-select').contains(/developer/i))
  })
})
