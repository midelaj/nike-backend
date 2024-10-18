const express = require('express');
const router = require('./src/routes/index')
const cors = require('cors');
const mongoose = require('./src/utils/db');
const path = require('path');


const app = express()
const port = 3000;


app.use(cors());
app.use(express.json())


app.use('/', router);
app.use('/assets', express.static(path.join(__dirname, 'src/assets')));


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})