const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'username wajib diisi'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    // select:false -> hash tidak ikut terambil pada query biasa
    password: { type: String, required: [true, 'password wajib diisi'], select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

module.exports = mongoose.model('User', userSchema);
