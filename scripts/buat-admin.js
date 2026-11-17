// Membuat atau menaikkan akun admin pertama.
// Jalankan: npm run buat-admin -- admin admin12345
require('dotenv').config({ quiet: true });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const [username, password] = process.argv.slice(2);

async function main() {
  if (!username || !password) {
    console.error('Pakai: npm run buat-admin -- <username> <password>');
    process.exit(1);
  }

  await mongoose.connect(process.env.DB_URI);
  const hash = await bcrypt.hash(password, 10);

  const user = await User.findOneAndUpdate(
    { username: username.toLowerCase() },
    { username: username.toLowerCase(), password: hash, role: 'admin' },
    { upsert: true, returnDocument: 'after', runValidators: true }
  );

  console.log('Admin siap: ' + user.username + ' (role: ' + user.role + ')');
  await mongoose.disconnect();
}

main().catch((err) => { console.error(err.message); process.exit(1); });
