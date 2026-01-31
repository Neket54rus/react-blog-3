import { selectByTestId } from '../../helpers/select-by-test-id'

describe('Роутинг', () => {
    describe('Пользователь авторизован', () => {
        it('Открытие страницы профиля', () => {
            cy.login('admin', 'admin')
            cy.visit('/profile/admin')
            cy.get(selectByTestId('profile-page')).should('exist')
        })
    })

    describe('Пользователь не авторизован', () => {
        it('Переход на главную страницу', () => {
            cy.visit('/')
            cy.get(selectByTestId('main-page')).should('exist')
        })

        it('Открытие страницы профиля', () => {
            cy.visit('/profile/1')
            cy.get(selectByTestId('main-page')).should('exist')
        })

        it('Открытие несуществующей странцы', () => {
            cy.visit('asdfa')
            cy.get(selectByTestId('not-found-page')).should('exist')
        })
    })
})
