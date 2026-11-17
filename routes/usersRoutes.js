const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const verifyToken = require('../middlewares/verifyToken');
const hanyaRole = require('../middlewares/hanyaRole');

router.get('/', verifyToken, hanyaRole('admin'), usersController.getAll);
router.patch('/:id/role', verifyToken, hanyaRole('admin'), usersController.patchRole);

module.exports = router;
