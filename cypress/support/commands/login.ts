import { USER_LOCAL_STORAGE_KEY } from '../../../src/entities/user'

export const login = (
    username: string = 'admin',
    password: string = 'admin',
): void => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:8000/login',
        body: {
            username,
            password,
        },
    }).then(({ body }) => {
        window.localStorage.setItem(
            USER_LOCAL_STORAGE_KEY,
            JSON.stringify(body),
        )
    })
}
