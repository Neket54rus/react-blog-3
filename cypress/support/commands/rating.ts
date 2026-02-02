export const setRate = (rate: number, feedback: string) => {
    cy.getByTestId('star-rating.' + rate).click()
    cy.getByTestId('rating-card-input').type(feedback)
    cy.getByTestId('rating-card-send').click()
}


declare global {
    namespace Cypress {
        interface Chainable {
            setRate(rate: number, feddback: string): Chainable<void>
        }
    }
}
