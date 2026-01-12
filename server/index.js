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
    try {
        // Параметры пагинации
        const page = Math.max(1, parseInt(req.query.page) || 1)
        const limit = Math.min(
            100,
            Math.max(1, parseInt(req.query.limit) || 10),
        )

        // Параметры сортировки
        const sortBy = req.query.sortBy || 'createdAt' // title, views, createdAt
        const sortOrder = req.query.sortOrder || 'desc' // asc, desc

        // Параметр поиска
        const search = req.query.search || ''

        // Параметр фильтрации по типу
        const typeParam = req.query.type || ''
        let selectedTypes = []

        // Обрабатываем параметр type (может быть строкой или массивом)
        if (typeParam) {
            if (Array.isArray(typeParam)) {
                // Если передано несколько типов через массив: ?type=IT&type=JavaScript
                selectedTypes = typeParam
                    .map((t) => t.toLowerCase().trim())
                    .filter((t) => t)
            } else {
                // Если передана строка, можно поддерживать несколько типов через запятую: ?type=IT,JavaScript
                selectedTypes = typeParam
                    .split(',')
                    .map((t) => t.toLowerCase().trim())
                    .filter((t) => t)
            }
        }

        let articles = [...db.data.articles]

        // Применяем поиск по заголовку (регистронезависимый)
        if (search) {
            const searchLower = search.toLowerCase()
            articles = articles.filter((article) =>
                article.title.toLowerCase().includes(searchLower),
            )
        }

        // Применяем фильтрацию по типу
        if (selectedTypes.length > 0) {
            articles = articles.filter((article) => {
                if (!article.type || !Array.isArray(article.type)) {
                    return false
                }

                // Преобразуем типы статьи к нижнему регистру для сравнения
                const articleTypes = article.type.map((t) => t.toLowerCase())

                // Проверяем, что хотя бы один из выбранных типов есть в статье
                return selectedTypes.some((selectedType) =>
                    articleTypes.includes(selectedType),
                )
            })
        }

        // Применяем сортировку
        articles.sort((a, b) => {
            let aValue, bValue

            // Выбираем поле для сортировки
            switch (sortBy) {
                case 'title':
                    aValue = a.title.toLowerCase()
                    bValue = b.title.toLowerCase()
                    break
                case 'views':
                    aValue = parseInt(a.views) || 0
                    bValue = parseInt(b.views) || 0
                    break
                case 'createdAt':
                default:
                    // Преобразуем дату в timestamp для корректной сортировки
                    aValue = new Date(
                        a.createdAt.split('.').reverse().join('-'),
                    ).getTime()
                    bValue = new Date(
                        b.createdAt.split('.').reverse().join('-'),
                    ).getTime()
                    break
            }

            // Определяем порядок сортировки
            if (sortOrder === 'asc') {
                if (aValue < bValue) return -1
                if (aValue > bValue) return 1
                return 0
            } else {
                if (aValue > bValue) return -1
                if (aValue < bValue) return 1
                return 0
            }
        })

        const totalItems = articles.length

        // Проверяем, если нет данных после поиска
        if (totalItems === 0) {
            return res.json({
                items: [],
                pagination: {
                    page: 1,
                    limit,
                    totalItems: 0,
                    totalPages: 0,
                    hasNextPage: false,
                    hasPrevPage: false,
                    type: selectedTypes,
                },
            })
        }

        const offset = (page - 1) * limit
        const totalPages = Math.ceil(totalItems / limit)

        // Проверяем существование запрашиваемой страницы
        if (page > totalPages) {
            return res.status(400).json({
                error: `Page ${page} does not exist. Total pages: ${totalPages}`,
                totalPages,
                page,
                limit,
            })
        }

        // Получаем пагинированные статьи
        const paginatedArticles = articles.slice(offset, offset + limit)

        // Добавляем информацию об авторах
        const result = paginatedArticles.map((article) => {
            const profile = db.data.profiles?.find(
                (p) => p.username === article.authorUsername,
            )

            return {
                ...article,
                author: profile || null,
            }
        })

        res.json({
            items: result,
            pagination: {
                page,
                limit,
                totalItems,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
                sortBy,
                sortOrder,
                search,
                type: selectedTypes, // Возвращаем примененные фильтры
            },
        })
    } catch (error) {
        console.error('Error fetching articles:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
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
