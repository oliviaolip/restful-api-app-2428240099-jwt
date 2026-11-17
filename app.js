require('dotenv').config({ quiet: true });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const logger = require('./middlewares/logger');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const mahasiswaRoutes = require('./routes/mahasiswaRoutes');
const fakultasRoutes = require('./routes/fakultasRoutes');
const prodiRoutes = require('./routes/prodiRoutes');
const dosenRoutes = require('./routes/dosenRoutes');
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/usersRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Penjaga konfigurasi ----------
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET belum diisi di .env - server dihentikan');
  process.exit(1);
}

// ---------- Middleware global ----------
app.use(logger);
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}));
app.use(express.json());

// ---------- Route dasar ----------
app.get('/', (req, res) => {
  res.send('Server Express.js berjalan!');
});

// ---------- Route per modul ----------
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/mahasiswa', mahasiswaRoutes);
app.use('/fakultas', fakultasRoutes);
app.use('/prodi', prodiRoutes);
app.use('/dosen', dosenRoutes);

// ---------- Handler 404 dan error handler (paling bawah) ----------
app.use(notFoundHandler);
app.use(errorHandler);

mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('Terhubung ke MongoDB');
    app.listen(PORT, () => console.log('Server berjalan di http://localhost:' + PORT));
  })
  .catch((err) => {
    console.error('Gagal terhubung:', err.message);
    process.exit(1);
  });
