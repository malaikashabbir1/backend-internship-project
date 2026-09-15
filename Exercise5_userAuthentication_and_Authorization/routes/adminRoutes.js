const express = require('express');
const router = express.Router();


const {authenticateMiddleware} = require('../middlewares/authenticateMiddleware');
const {authorization} = require('../middlewares/authorizeMiddleware');
const {getAdminDashboard} = require('../controllers/adminController');

router.get('/dashboard', authenticateMiddleware, authorization, getAdminDashboard);

module.exports = router;