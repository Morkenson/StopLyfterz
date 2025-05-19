/// <reference types="cypress" />

describe('Bulk create Lifter Cards with random web images', () => {
  const URL = 'http://localhost:5173/add-card'       // adjust to match your app’s route
  const CARD_COUNT = 20              // how many cards you want to generate
  const IMG_WIDTH = 400              // desired width of the fetched image
  const IMG_HEIGHT = 300             // desired height (picsum supports WIDTH/HEIGHT)

  beforeEach(() => {
    // optionally set your baseUrl in cypress.config.js
    cy.visit(URL)
  })

  it(`submits ${CARD_COUNT} cards with a unique random image each time`, () => {
    for (let i = 0; i < CARD_COUNT; i++) {
      // 1) (Re)visit the form page to reset all fields
      cy.visit(URL)

      // 2) Fill in your text fields (adjust selectors/name attrs to match your form)
      cy.get('input[name="city"]').clear().type(`City ${i} — ${Date.now()}`)
      cy.get('input[name="state"]').clear().type('CA')
      cy.get('input[name="zipCode"]').clear().type('90210')
      cy.get('input[name="company"]').clear().type(`Acme Corp ${i}`)
      cy.get('textarea[name="description"]')
        .clear()
        .type(`Automated load test entry #${i}`)

      // 3) Fetch a random image from picsum.photos (returns a 302 → binary redirect)
      cy.request({
        url: `https://picsum.photos/${IMG_WIDTH}/${IMG_HEIGHT}`,
        encoding: 'binary'
      }).then((resp) => {
        // 4) Convert the binary to a Blob
        const blob = Cypress.Blob.binaryStringToBlob(resp.body, 'image/jpeg')

        // 5) Attach it to the file input
        cy.get('input[type="file"]')
          .attachFile({
            fileContent: blob,
            fileName: `random-${i}.jpg`,
            mimeType: 'image/jpeg'
          })
      })

      // 6) Submit the form
      cy.get('button[type="submit"]').click()

      // 7) Assert success – tweak to whatever your UI shows
      cy.contains('Card created successfully').should('be.visible')

      // 8) (Optional) wait a tiny bit so your backend isn’t overwhelmed
      cy.wait(300)
    }
  })
})
