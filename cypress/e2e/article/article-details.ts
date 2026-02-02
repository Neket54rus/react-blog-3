let currentArticleId = ''

describe('Пользователь заходит на старницу статиьи', () => {
    beforeEach(() => {
        cy.login()
        cy.createArticle().then((article) => {
            currentArticleId = article.id
            cy.visit(`articles/${article.id}`)
        })
    })

    afterEach(() => {
        cy.removeArticle(currentArticleId)
    })

    it('И видит содержимое статьи', () => {
        cy.getByTestId('article-details-info').should('exist')
    })

    it('И видит список рекоммендаций', () => {
        cy.getByTestId('article-recommendation').should('exist')
    })

    it('И оставляет комментарий', () => {
        cy.getByTestId('article-details-info')
        cy.getByTestId('add-comment-form').scrollIntoView()
        cy.addComment('text')
        cy.getByTestId('comment-card').should('have.length', 1)
    })

    it('И оценивает статью', () => {
        cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' })
        cy.getByTestId('article-details-info')
        cy.getByTestId('rating-card').scrollIntoView()
        cy.setRate(4, 'feedback')
        cy.get('[data-selected]=true').should('have.length', 4)
    })
})
