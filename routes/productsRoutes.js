const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const upload = require('../middlewares/multer');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const { productValidations } = require('../middlewares/validators/productValidations');

router.get('/', productsController.list);
router.get('/cart', productsController.cart);
router.get('/search', productsController.search);

router.get('/create', isAuthenticated, productsController.create);
router.post('/', isAuthenticated, upload.single('image'), productValidations, productsController.store);

router.get('/:id/edit', isAuthenticated, productsController.edit);
router.put('/:id', isAuthenticated, productValidations, productsController.update);

router.delete('/:id', isAuthenticated, productsController.destroy);
router.get('/:id', productsController.detail);

module.exports = router;