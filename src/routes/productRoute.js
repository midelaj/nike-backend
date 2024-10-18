const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');

const { addProduct, showAllProduct, showProduct, deleteProduct } = require('../controller/productController');
const authentication = require('../middleware/authentication');


router.post('/', authentication, upload, addProduct);
router.get('/', showAllProduct);
router.get('/:id', showProduct);
router.delete('/:id', authentication, deleteProduct);

module.exports = router;