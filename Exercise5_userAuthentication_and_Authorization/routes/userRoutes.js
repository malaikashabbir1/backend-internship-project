const express = require('express');
const router = express.Router();

const {registerUser, getAllUsers, loginUser, getProfile } = require('../controllers/userController');
const {authenticateMiddleware} = require('../middlewares/authenticateMiddleware');
const {validateUserFields} = require('../middlewares/userMiddleware');


router.get('/', getAllUsers);

router.post('/register', validateUserFields, registerUser);

router.post('/login', loginUser);

router.get ('/profile', authenticateMiddleware, getProfile);

module.exports = router;