const express = require('express');
const router = express.Router();

const productsController = require('./controllers/productsController');

router.get('/products', productsController.findAllProducts);
router.get('/products/:id', productsController.findProductById);
router.post('/products', productsController.insertProduct);
router.put('/products/:id', productsController.updateProduct);
router.delete('/products/:id', productsController.deleteProduct);

module.exports = router;