// src/middleware/logger.js
// Mencatat: METHOD URL -> STATUS (waktu ms)
export function logger(req, res, next) {
    const mulai = Date.now();

    // 'finish' dipicu saat jawaban selesai dikirim, jadi status sudah pasti
    res.on('finish', () => {
        const ms = Date.now() - mulai;
        console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms} ms)`);
    });

    next();
}
