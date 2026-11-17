const express = require('express');
const router = express.Router();
const mahasiswaController = require('../controllers/mahasiswaController');
const verifyToken = require('../middlewares/verifyToken');
const hanyaRole = require('../middlewares/hanyaRole');

router.get('/', mahasiswaController.getAll);                 // publik
router.get('/:id', mahasiswaController.getById);             // publik
router.post('/', verifyToken, mahasiswaController.create);   // wajib login
router.put('/:id', verifyToken, mahasiswaController.update); // wajib login
router.delete('/:id', verifyToken, hanyaRole('admin'), mahasiswaController.remove); // admin

module.exports = router;
