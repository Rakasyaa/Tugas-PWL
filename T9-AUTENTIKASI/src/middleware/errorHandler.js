// src/middleware/errorHandler.js
// Error-handling middleware: WAJIB 4 parameter dan dipasang PALING AKHIR
export function errorHandler(err, req, res, next) {
    const status = err.status ?? 500;

    if (status >= 500) console.error(err);   // error server dicatat lengkap di terminal

    res.status(status).json({
        error: {
            // error 500 tidak membocorkan detail ke klien
            pesan: status < 500 ? err.message : 'Terjadi kesalahan pada server',
            kode: err.kode ?? (status < 500 ? 'REQUEST_ERROR' : 'INTERNAL_ERROR'),
        },
    });
}
