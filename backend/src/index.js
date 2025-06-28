require('dotenv/config')
const http = require('http')
const { Server: IOServer } = require('socket.io')
const { createApp } = require('./app.js')
const { env } = require('./config/env.js')

const { registerClaudeSocket } = require('./sockets/claude.socket.js')
const { registerDeepgramSocket } = require('./sockets/deepgram.socket.js')

const app = createApp()
const server = http.createServer(app)

const io = new IOServer(server, {
    cors: {
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
    },
    // Improve connection stability for long-running streams
    pingTimeout: 60000,      // 60 seconds (increased from default 5000ms)
    pingInterval: 25000,     // 25 seconds (increased from default 25000ms)
    connectTimeout: 20000,   // 20 seconds connection timeout
    maxHttpBufferSize: 10e6, // 10MB max buffer for large payloads
    transports: ['websocket', 'polling'], // Prefer websocket, fallback to polling
})

io.on('connection', (socket) => {
    console.log({ id: socket.id }, 'socket connected')
    socket.on('disconnect', (reason) => {
        console.log({ id: socket.id, reason }, 'socket disconnected')
    })
})

registerDeepgramSocket(io)
registerClaudeSocket(io)

const listener = server.listen(env.PORT || 3000, () => {
    const { port } = listener.address()
    console.log({ port, env: env.NODE_ENV }, `HTTP server listening on :${port}`)
})

const shutdown = (signal) => {
    console.log({ signal }, 'shutting down')
    io.close(() => {
        server.close(() => {
            console.log('closed')
            process.exit(0)
        })
    })
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
