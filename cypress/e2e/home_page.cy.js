describe('nav bar test', () => {
  it('should go home page', () => {
    cy.visit('/')
    cy.get('.text-lg').contains('RETROSPECTIVE').click()
    expect(cy.visit('/'))
  })

  it('should go history page', () => {
    cy.login()
    cy.visit('/')
    cy.wait('@session')

    cy.get('.text-md')
      .contains(/history/i)
      .click()
    expect(cy.visit('/history'))
  })
})

describe('select user team page', () => {
  it('should show correct home page', () => {
    cy.visit('/')

    if (cy.contains('Select')) {
      cy.get('button')
        .contains(/search/i)
        .click()

      expect(cy.get(/please select your team!!/i))
    }
  })

  it('should select correct team board list', () => {
    cy.login()
    cy.visit('/')
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
    cy.visit('/')
    cy.wait('@session')

    expect(cy.get('#team-select').contains(/developer/i))
  })
})
