const User = require('../models/userModel');
const { errorHttp } = require('../middlewares/errorHandler');

// GET /users -> 200 (khusus admin)
exports.getAll = async (req, res) => {
  const data = await User.find().select('username role createdAt').sort({ username: 1 });
  res.json(data);
};

// PATCH /users/:id/role -> 200 (khusus admin)
exports.patchRole = async (req, res) => {
  const { role } = req.body;
  if (!['user', 'admin'].includes(role)) {
    throw errorHttp(400, "role hanya boleh 'user' atau 'admin'");
  }

  const data = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { returnDocument: 'after', runValidators: true }
  ).select('username role');

  if (!data) throw errorHttp(404, 'Pengguna tidak ditemukan');
  res.json(data);
};
