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

app.get('/profile/:id', (req, res) => {
    const id = req.params.id
    const profile = db.data.profiles?.find((p) => p.username === id)

    if (!profile) {
        res.status(404).json({ message: 'Профиль не найден' })
    }

    res.json(profile)
})

app.put('/profile/:id', async (req, res) => {
    db.data.profiles = db.data.profiles.map((p) => {
        if (p.username === req.params.id) {
            return {
                ...p,
                ...req.body,
            }
        }

        return p
    })

    await db.write()
    res.json(db.data.profiles.find((p) => p.username === req.params.id))
})

app.get('/articles', (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit

    const articles = db.data.articles

    const paginatedArticles = articles.slice(offset, offset + limit)

    const result = paginatedArticles.map((article) => {
        const profile = db.data.profiles.find(
            (p) => p.username === article.authorUsername,
        )

        return {
            ...article,
            author: profile || null,
        }
    })

    const totalItems = articles.length
    const totalPages = Math.ceil(totalItems / limit)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    res.json({
        items: result,
        pagination: {
            page,
            limit,
            totalItems,
            totalPages,
            hasNextPage,
            hasPrevPage,
        },
    })
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

// Добавьте этот маршрут после других маршрутов, перед app.listen

// Сохранение нового комментария
app.post('/comments', async (req, res) => {
    const { text, articleId, userId } = req.body

    // Проверяем обязательные поля
    if (!text || !articleId || !userId) {
        return res.status(400).json({
            message: 'Необходимо указать text, articleId и userId',
        })
    }

    // Проверяем, существует ли статья
    const article = db.data.articles?.find((a) => a.id === articleId)
    if (!article) {
        return res.status(404).json({
            message: 'Статья не найдена',
        })
    }

    // Проверяем, существует ли пользователь (по username)
    const user = db.data.users?.find((u) => u.username === userId)
    if (!user) {
        return res.status(404).json({
            message: 'Пользователь не найден',
        })
    }

    // Создаем новый комментарий
    const newComment = {
        id: (db.data.comments?.length || 0) + 1, // Генерируем ID
        text,
        articleId,
        userId,
    }

    // Инициализируем массив комментариев, если его нет
    if (!db.data.comments) {
        db.data.comments = []
    }

    // Добавляем комментарий
    db.data.comments.push(newComment)
    await db.write()

    // Возвращаем созданный комментарий с пользователем
    res.status(201).json({
        ...newComment,
        user: {
            id: user.id,
            username: user.username,
            role: user.role,
            avatar: user.avatar,
        },
    })
})

// === start ===
app.listen(8000, () => {
    console.log('Express + LowDB server is running on port 8000')
})
