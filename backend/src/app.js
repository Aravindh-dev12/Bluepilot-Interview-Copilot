const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')

const { rateLimiter } = require('./middlewares/rateLimit.js')
const { errorHandler } = require('./middlewares/error.js')

const routes = require('./routes/index.js')

function createApp() {
    const app = express()

    app.disable('x-powered-by')

    app.use(
        cors({
            origin: (origin, callback) => {
                // Allow requests with no origin (like mobile apps or curl requests)
                if (!origin) return callback(null, true)

                // Allow specific origins for credentials mode
                const allowedOrigins = [
                    'https://ai-interview-copilot-mvp-rt9v.vercel.app',
                    'https://staging.robo-apply.com',
                    'http://localhost:5174',
                    'http://localhost:5173', // Vite dev server
                    'http://localhost:3000', // Local backend
                    'https://ai-interview-copilot-mvp.onrender.com', // Production backend
                    // Add your frontend domain when you deploy it
                ]

                if (allowedOrigins.includes(origin)) {
                    callback(null, origin)
                } else {
                    callback(null, false)
                }
            },
            credentials: true
        })
    )
    app.use(helmet())
    app.use(compression())

    app.use(express.json({ limit: '2mb' }))
    app.use(express.urlencoded({ extended: true }))

    // Simple request logging
    app.use((req, res, next) => {
        const start = Date.now()
        res.on('finish', () => {
            const duration = Date.now() - start
            console.log(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms`)
        })
        next()
    })

    app.use('/api/ai-interview-copilot', routes)

    app.use(rateLimiter)

    // 404 handler
    app.use((req, res) => {
        res.status(404).json({ ok: false, error: 'Not Found' })
    })

    app.use(errorHandler)

    return app
}

module.exports = { createApp }