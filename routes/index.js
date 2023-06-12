const express = require('express');

const router = express.Router();
const authRoutes = require('./authRoutes');
const usersRoutes = require('./usersRoutes');

router.use('/', authRoutes);
router.use('/users', usersRoutes);

module.exports = router;
