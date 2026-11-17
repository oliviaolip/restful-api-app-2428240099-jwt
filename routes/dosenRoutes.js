const express = require('express');
const router = express.Router();
const dosenController = require('../controllers/dosenController');
const verifyToken = require('../middlewares/verifyToken');
const hanyaRole = require('../middlewares/hanyaRole');

router.get('/', dosenController.getAll);
router.get('/:id', dosenController.getById);
router.post('/', verifyToken, hanyaRole('admin'), dosenController.create);

module.exports = router;
