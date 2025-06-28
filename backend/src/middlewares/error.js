function errorHandler(err, _req, res, _next) {
    const status = err?.status || 500
    const message = err?.message || 'Internal Server Error'
    if (status >= 500) {
        console.error({ err }, 'Unhandled error')
    } else {
        console.warn({ err }, 'Handled error')
    }
    res.status(status).json({ ok: false, error: message })
}

module.exports = { errorHandler }
