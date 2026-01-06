const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const uploadUsers = require('../middlewares/multerUsers');
const { isAuthenticated, isGuest } = require('../middlewares/authMiddleware');
const { registerValidations, loginValidations, editValidations } = require('../middlewares/validators/userValidations');

router.get('/login', isGuest, usersController.login);
router.post('/login', loginValidations, usersController.processLogin);

router.get('/profile', isAuthenticated, usersController.profile);

router.get('/register', isGuest, usersController.register);
router.post('/register', uploadUsers.single('image'), registerValidations, usersController.processRegister);

router.get('/logout', isAuthenticated, usersController.logout);

router.get('/:id/edit', isAuthenticated, usersController.edit);
router.put('/:id', isAuthenticated, editValidations, usersController.update);

router.get('/:id', usersController.detail);

module.exports = router;