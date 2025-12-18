const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.list);

router.get('/cart', productsController.cart);

router.get('/create', productsController.create);

router.post('/create', productsController.store);

router.get('/edit/:id', productsController.edit);

router.put('/edit/:id', productsController.update);

router.delete('/delete/:id', productsController.destroy);

router.get('/:id', productsController.detail);

module.exports = router;