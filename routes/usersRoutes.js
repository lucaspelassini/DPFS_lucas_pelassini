const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const uploadUsers = require('../middlewares/multerUsers');
const { isAuthenticated, isGuest } = require('../middlewares/authMiddleware');

router.get('/login', isGuest, usersController.login);
router.post('/login', usersController.processLogin);

router.get('/profile', isAuthenticated, usersController.profile);

router.get('/register', isGuest, usersController.register);
router.post('/register', uploadUsers.single('image'), usersController.processRegister);

router.get('/logout', isAuthenticated, usersController.logout);

module.exports = router;