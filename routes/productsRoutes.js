const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const upload = require('../middlewares/multer');

router.get('/', productsController.list);

router.get('/cart', productsController.cart);

router.get('/create', productsController.create);

router.post('/', upload.single('image'), productsController.store);

router.get('/:id/edit', productsController.edit);

router.put('/:id', upload.single('image'), productsController.update);

router.delete('/:id', productsController.destroy);

router.get('/:id', productsController.detail);

module.exports = router;