// src/data/peminjaman.data.js
import { prisma } from '../lib/prisma.js';

// include = JOIN: setiap peminjaman membawa data bukunya
export function semua() {
    return prisma.peminjaman.findMany({
        include: { buku: true },
        orderBy: { id: 'asc' },
    });
}
