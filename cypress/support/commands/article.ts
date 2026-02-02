/* eslint-disable @typescript-eslint/no-namespace */
import { Article } from '../../../src/entities/article'

const defaultArticle = {
    "title": "Введение в JavaScript: основы для начинающих",
    "subtitle": "Краткий пересказ всего JavaScript",
    "text": "JavaScript - это язык программирования, который делает веб-страницы интерактивными. В этой статье рассмотрим базовые концепции.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1024px-Unofficial_JavaScript_logo_2.svg.png",
    "views": 1245,
    "createdAt": "15.01.2025",
    "authorUsername": "admin",
    "type": [
    "IT",
    "JavaScript",
    "Программирование"
    ],
    "blocks": []
}

export const createArticle = (article?: Article) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:8000/articles/',
        headers: {
            Authorization: 'test',
        },
        body: article || defaultArticle,
    }).then((responce) => responce.body)
}

export const removeArticle = (articleId: string) => {
    cy.request({
        method: 'DELETE',
        url: 'http://localhost:8000/articles/' + articleId,
        headers: {
            Authorization: 'test',
        },
    })
}

declare global {
    namespace Cypress {
        interface Chainable {
            createArticle(article?: Article): Chainable<Article>
            removeArticle(articleId: string): Chainable<void>
        }
    }
}
