const express = require('express');
const router = express.Router();

const userRouter = require('./userRoute');
const productRouter = require('./productRoute');

router.use('/user', userRouter);
router.use('/product', productRouter);

module.exports = router;