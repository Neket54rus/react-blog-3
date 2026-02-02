let userName: string

describe('Пользователь заходит на страницу профиля', () => {
    beforeEach(() => {
        cy.visit('')
        cy.login().then((data) => {
            userName = data.username
            cy.visit(`profile/${userName}`)
        })
    })

    afterEach(() => {
        cy.resetProfile(userName)
    })

    it('Профиль успешно загружается', () => {
        cy.getByTestId('first-name').should('have.text', 'Nikita')
    })

    it('Редактирование профиля', () => {
        cy.updateProfile()
        cy.getByTestId('first-name').should('have.text', 'FirstName')
        cy.getByTestId('last-name').should('have.text', 'LastName')
    })
})
