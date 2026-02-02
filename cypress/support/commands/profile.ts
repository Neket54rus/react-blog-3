/* eslint-disable @typescript-eslint/no-namespace */
export const updateProfile = () => {
    cy.getByTestId('edit-button').click()
    cy.getByTestId('first-name').clear().type('FirstName')
    cy.getByTestId('last-name').clear().type('LastName')
    cy.getByTestId('save-button').click()
}

export const resetProfile = (username: string) => {
    cy.request({
        method: 'PUT',
        url: 'http://localhost:8000/profile/' + username,
        headers: {
            Authorization: 'test',
        },
        body: {
            firstName: 'Nikita',
            lastName: 'Evdokimov',
            age: 24,
            currency: 'RUB',
            country: 'Belarus',
            city: 'Novosibirsk',
            username: 'admin',
            avatar: 'https://img.freepik.com/premium-vector/content-creator_1271422-16038.jpg?semt=ais_hybrid&w=740&q=80',
        },
    })
}

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(): Chainable<void>
            resetProfile(username: string): Chainable<void>
        }
    }
}
