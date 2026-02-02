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

    it('На моках', () => {
        cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' })
        cy.getByTestId('article-list').should('exist')
        cy.getByTestId('article-list-item').should('have.length.greaterThan', 3)
    })
})
