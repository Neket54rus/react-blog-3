import path from 'path'
import { fileURLToPath } from 'url'

import cors from 'cors'
import express from 'express'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

// === helpers для __dirname в ESM ===
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// === db ===
const adapter = new JSONFile(path.resolve(__dirname, 'db.json'))
const db = new Low(adapter, { users: [] })

await db.read()

// === app ===
const app = express()
app.use(express.json())

// === CORS ===
app.use(
    cors({
        origin: 'http://localhost:3000',
        credential: true,
    }),
)

// === delay middleware (1s) ===
app.use(async (_req, _res, next) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    next()
})

// === auth middleware ===
app.use((req, res, next) => {
    if (req.path === '/login') {
        return next()
    }

    if (!req.headers.authorization) {
        return res.status(403).json({ message: 'auth error' })
    }

    next()
})

// === routes ===

// login
app.post('/login', async (req, res) => {
    const { username, password } = req.body

    const userFromDb = db.data.users.find(
        (user) => user.username === username && user.password === password,
    )

    if (!userFromDb) {
        return res.status(403).json({ message: 'auth error' })
    }

    return res.json(userFromDb)
})

// пример CRUD (как json-server)
app.get('/users', (_req, res) => {
    res.json(db.data.users)
})

app.post('/users', async (req, res) => {
    db.data.users.push(req.body)
    await db.write()
    res.status(201).json(req.body)
})

app.get('/profile', (_req, res) => {
    res.json(db.data.profile)
})

app.put('/profile', async (req, res) => {
    // Просто заменяем весь профиль на то, что пришло
    db.data.profile = req.body
    await db.write()
    res.json(db.data.profile)
})

app.get('/articles/:id', (req, res) => {
    const id = req.params.id
    const article = db.data.articles?.find((a) => a.id === id)

    if (!article) {
        return res.status(404).json({ message: 'Статья не найдена' })
    }

    res.json(article)
})

app.get('/comments/:id', (req, res) => {
    const articleId = req.params.id
    const comments =
        db.data.comments?.filter((c) => c.articleId === articleId) || []

    if (comments.length === 0) {
        return res.json([])
    }

    // Обогащаем комментарии данными пользователя
    const enrichedComments = comments.map((comment) => {
        const user = db.data.users.find((u) => u.username === comment.userId)

        // Возвращаем полный объект с user вместо userId
        return {
            id: comment.id,
            text: comment.text,
            articleId: comment.articleId,
            user: user || null, // Полный объект пользователя
        }
    })

    res.json(enrichedComments)
})

// === start ===
app.listen(8000, () => {
    console.log('Express + LowDB server is running on port 8000')
})
