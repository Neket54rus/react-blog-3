describe('Пользователь заходит на страницу статей', () => {
    beforeEach(() => {
        cy.login().then(() => {
            cy.visit('articles')
        })
    })

    it('Страница со списком статей', () => {
        cy.getByTestId('article-list').should('exist')
        cy.getByTestId('article-list-item').should('have.length.greaterThan', 3)
    })
})
