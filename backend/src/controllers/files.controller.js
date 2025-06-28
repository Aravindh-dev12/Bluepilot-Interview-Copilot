const pdfParse = require('pdf-parse')

async function extractText(req, res, next) {
    try {
        const file = req.file
        if (!file || !file.buffer) {
            res.status(400).json({ ok: false, error: 'file is required' })
            return
        }
        if (!(file.mimetype?.includes('pdf') || (file.originalname || '').toLowerCase().endsWith('.pdf'))) {
            res.status(400).json({ ok: false, error: 'only PDF files are supported' })
            return
        }
        const data = await pdfParse(file.buffer)
        const text = data?.text || ''
        res.json({ ok: true, text })
    } catch (err) {
        next(err)
    }
}

module.exports = { extractText }
