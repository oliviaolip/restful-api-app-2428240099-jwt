const express = require('express');
const router = express.Router();
const fakultasController = require('../controllers/fakultasController');
const verifyToken = require('../middlewares/verifyToken');
const hanyaRole = require('../middlewares/hanyaRole');

router.get('/', fakultasController.getAll);
router.get('/:id', fakultasController.getById);
router.post('/', verifyToken, hanyaRole('admin'), fakultasController.create);

module.exports = router;
