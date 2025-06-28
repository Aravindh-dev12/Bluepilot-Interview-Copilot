const { Router } = require('express')
const multer = require('multer')

// Import controllers
const {
    getSession,
    completeSession,
    nextMockQuestion,
    registerSession
} = require('../controllers/session.controller.js')

const { extractText } = require('../controllers/files.controller.js')

const {
    detect: claudeDetect,
    generate: claudeGenerate,
    jobDescription: claudeJobDescription,
    transcribe: claudeTranscribe
} = require('../controllers/claude.controller.js')

const router = Router()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } })

// Session routes
router.get('/session', getSession)
router.post('/session/complete', completeSession)
router.post('/session/mock/next-question', nextMockQuestion)
router.post('/session/register', registerSession)

// File routes
router.post('/files/extract-text', upload.single('file'), extractText)

// Claude routes
router.post('/claude/generate', claudeGenerate)
router.post('/claude/detect', claudeDetect)
router.post('/claude/job-description', claudeJobDescription)
router.post('/claude/transcribe', upload.single('file'), claudeTranscribe)

// Health routes
router.get('/health', (_req, res) => {
    res.json({ ok: true, service: 'backend', status: 'healthy' })
})

module.exports = router
