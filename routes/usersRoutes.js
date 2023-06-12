const express = require('express');
const userController = require('../controllers/usersController');
const checkStatusMiddleware = require('../middlewares/checkStatusMiddleware');

const router = express.Router();

router.get('/', checkStatusMiddleware('active'), userController.getAll);
router.get('/count', checkStatusMiddleware('active'), userController.countAll);
router.patch('/', checkStatusMiddleware('active'), userController.changeStatus);
router.patch('/delete', checkStatusMiddleware('active'), userController.delete);

module.exports = router;
