const jwt = require('jsonwebtoken');

// 1. baca header Authorization  2. isi req.user  3. tolak 401 bila tidak valid
function verifyToken(req, res, next) {
  const header = req.headers.authorization || '';

  if (!header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  const token = header.slice(7).trim();

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    return next();
  } catch (err) {
    const pesan = err.name === 'TokenExpiredError' ? 'Token kedaluwarsa' : 'Token tidak valid';
    return res.status(401).json({ message: pesan });
  }
}

module.exports = verifyToken;
