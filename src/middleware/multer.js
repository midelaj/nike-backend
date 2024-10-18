const multer = require('multer')
const path = require('path')
const fs = require('fs')


const assetsDir = path.resolve(__dirname,'../assets')
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, assetsDir)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage,
 }).fields([
     { name: 'mainImage', maxCount: 1 },
    {name: 'images', maxCount: 5}
 ])

module.exports = upload;