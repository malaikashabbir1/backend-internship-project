const express = require('express');
const router = express.Router();

const {registerUser, getAllUsers, loginUser, getProfile} = require('../controllers/userController');
const {authenticateMiddleware} = require('../middlewares/authenticateMiddleware')

router.get('/', getAllUsers);
router.post('/', registerUser);
router.post('/login', loginUser);
router.get ('/profile', authenticateMiddleware, getProfile);


module.exports = router;