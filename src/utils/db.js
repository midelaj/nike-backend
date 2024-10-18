const mongoose = require('mongoose');


MONGI_URI = "mongodb://127.0.0.1:27017/nike"

mongoose.connect(MONGI_URI).then(()=>{console.log("connection successfully")}).catch((err)=>{console.log("error connecting to mongodb", err.message);
})

module.exports = mongoose;