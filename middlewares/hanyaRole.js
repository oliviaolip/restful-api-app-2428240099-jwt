const { errorHttp } = require('./errorHandler');

// hanyaRole('admin') -> middleware; dipasang SETELAH verifyToken
function hanyaRole(...roleDiizinkan) {
  return (req, res, next) => {
    if (!req.user || !roleDiizinkan.includes(req.user.role)) {
      throw errorHttp(403, 'Akses ditolak: peran Anda tidak diizinkan');
    }
    next();
  };
}

module.exports = hanyaRole;
