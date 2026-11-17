const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { errorHttp } = require('../middlewares/errorHandler');

const SALT_ROUNDS = 10;

// POST /auth/register -> 201 { id, username, role }
exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw errorHttp(400, 'username dan password wajib diisi');
  }

  const hash = await bcrypt.hash(password, SALT_ROUNDS);

  // role TIDAK dibaca dari req.body: register selalu menghasilkan 'user'
  const user = await User.create({ username, password: hash });

  res.status(201).json({ id: user._id, username: user.username, role: user.role });
};

// POST /auth/login -> 200 { token }
exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) throw errorHttp(400, 'username dan password wajib diisi');

  const user = await User.findOne({ username: String(username) }).select('+password');

  // Pesan gagal tidak membedakan username salah vs password salah
  const samar = errorHttp(401, 'Username atau password salah');
  if (!user) throw samar;

  const cocok = await bcrypt.compare(String(password), user.password);
  if (!cocok) throw samar;

  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
};

// GET /auth/me -> 200 payload token
exports.me = async (req, res) => {
  res.json(req.user);
};
