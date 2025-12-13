import path from 'path'
import { fileURLToPath } from 'url'

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

// === start ===
app.listen(8000, () => {
    console.log('Express + LowDB server is running on port 8000')
})
