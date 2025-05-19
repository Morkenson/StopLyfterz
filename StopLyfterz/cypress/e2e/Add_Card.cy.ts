/// <reference types="cypress" />
import 'cypress-file-upload'
import { faker } from '@faker-js/faker'

describe('Bulk create Lifter Cards with random web images', () => {
  const URL = '/add-card'
  const CARD_COUNT = 10
  const IMG_WIDTH = 1080
  const IMG_HEIGHT = 1080

  before(() => {
    // 1) Visit your login page
    cy.visit('/login')

    // 2) Fill in your test user’s credentials
    cy.get('input[type="email"]').type('morkzach@gmail.com')
    cy.get('input[type="password"]').type('123456')

    // 3) Submit and verify you’re on the dashboard (or wherever)
    cy.get('button[type="submit"]').click()
    cy.url().should('not.include', '/login')
  })

  it(`submits ${CARD_COUNT} cards`, () => {
    for (let i = 0; i < CARD_COUNT; i++) {
      // 1) Visit form
      cy.visit(URL)

      // 2) Fetch random image and attach to <input type="file">

      cy.request('https://randomuser.me/api/?inc=picture')
  .its('body.results[0].picture.large')
  .then(picUrl => {
    // fetch the actual JPEG
    return cy.request({ url: picUrl, encoding: 'binary' })
  })
  .then(resp => {
    const blob = Cypress.Blob.binaryStringToBlob(resp.body, 'image/jpeg')
    cy.get('input[type="file"]')
      .attachFile({
        fileContent: blob,
        fileName: `user-${i}.jpg`,
        mimeType: 'image/jpeg'
      })
  })

      // 3) Fill text fields by placeholder
      cy.get('input[placeholder="e.g., Chicago"]')
        .clear()
        .type(faker.address.city())
      cy.get('input[placeholder="e.g., IL"]')
        .clear()
        .type(faker.address.state())
      cy.get('input[placeholder="e.g., 60127"]')
        .clear()
        .type(faker.address.zipCode())
      cy.get('input[placeholder="e.g., Walmart"]')
        .clear()
        .type(faker.company.name())
      cy.get('textarea[placeholder="What happened?"]')
        .clear()
        .type(faker.person.bio())

      // 4) Submit & assert
      cy.get('button.add-card-button').click()
      

      // tiny pause so backend isn’t overwhelmed
      cy.wait(2500)
    }
  })
})


