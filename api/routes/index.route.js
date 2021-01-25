const express = require('express');
const pagination = require('../middleware/pagination');
const authRoutes = require('./auth.route');
const catRoutes = require('./category.route');

const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

router.use(pagination);
router.use('/auth', authRoutes);
router.use('/category', catRoutes);
module.exports = router;
