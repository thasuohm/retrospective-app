/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('login', () => {
  cy.intercept('/api/auth/session', {fixture: 'session.json'}).as('session')

  // Set the cookie for cypress.
  // It has to be a valid cookie so next-auth can decrypt it and confirm its validity.
  // This step can probably/hopefully be improved.
  // We are currently unsure about this part.
  // We need to refresh this cookie once in a while.
  // We are unsure if this is true and if true, when it needs to be refreshed.
  cy.setCookie(
    'next-auth.session-token',
    'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..TvBbYo1Ya2NLvFNB.9yQFTag3BHETgSfEP0Nh9QShM7bi_1oKO0ko1hZzuQHwebAdqlc0DLspx4-6E6bwJmYXeZOR0qT4EhynBZfyp1um2Jod5rexnYs94NZpE8k_x7s5jhuqkXV9A5zuKwvBqPH8xp5HkbFmlAROIsmbuEmJzWMuIZYolWyi743yVu129W4GTT3v6N2d9rnEMtwbQXq6u4QzQVp3VlUpxwo3vCnOqfhF0LcrF2ox2cQUxiQBe9MsFsKz8rspHbC5d3PMnr1XQLNNnFaBKXO1thib_fp_hYiUtYikD8Mx_S_-0gSbh89EmoSsCz1hLCeqzG-1qTdKk6ndaCTdVWWStT1wTU6Jzg2vmqTqt7pwWA.OBym25CkzF2fDbXwX-h-aw'
  )
  //   Cypress.Cookies.preserveOnce('next-auth.session-token')
})

// Cypress.Commands.add('login', (path, visitOptions) => {
//   const options = {
//     method: 'POST',
//     url: 'https://www.googleapis.com/oauth2/v4/token',
//     body: {
//       client_id:
//         '967292249484-mgqjkbsd52kfq7oj6nabq7b4597kcgll.apps.googleusercontent.com',
//       client_secret: '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',
//       refresh_token:
//         '1//04d_eBdmk7ykxCgYIARAAGAQSNwF-L9IrLArcT2gqW2R-dju1Eie3o8R9p6LvNh7f5JWYHu7DTaCtm8Bg3_IXQyjpL6HzYEW-VBU',
//       grant_type: 'refresh_token',
//     },
//     // Restrict cypress from showing errored response by default.
//     // It would dump the whole request object, including env values.
//     failOnStatusCode: false,
//   }

//   return cy.request(options).then((response) => {
//     if (response.status !== 200) {
//       throw new Error(
//         `Request to get auth token failed, response: ${JSON.stringify(
//           response.body
//         )}`
//       )
//     }

//     const {id_token: token} = response.body

//     return cy.visit(path || '/', {
//       headers: {Authorization: `Bearer ${token}`},
//       ...visitOptions,
//     })
//   })
// })
