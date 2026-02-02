/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable arrow-body-style */
import { type User, USER_LOCAL_STORAGE_KEY } from '../../../src/entities/user'
import { selectByTestId } from '../../helpers/select-by-test-id'

export const login = (
    username: string = 'admin',
    password: string = 'admin',
) => {
    return cy
        .request({
            method: 'POST',
            url: 'http://localhost:8000/login',
            body: {
                username,
                password,
            },
        })
        .then(({ body }) => {
            window.localStorage.setItem(
                USER_LOCAL_STORAGE_KEY,
                JSON.stringify(body),
            )

            return body
        })
}

export const getByTestId = (id: string) => {
    return cy.get(selectByTestId(id))
}

declare global {
    namespace Cypress {
        interface Chainable {
            login(username?: string, password?: string): Chainable<User>
            getByTestId(id?: string): ReturnType<typeof cy.get>
        }
    }
}
