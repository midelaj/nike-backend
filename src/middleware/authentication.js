const jwt = require('jsonwebtoken')
const {secretKey} = require('../controller/userController')


const authentication = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];


    console.log('Token', token);
    
    if (!token) return res.status(401).json({message:'access denied, no token provided'})
    console.log(secretKey);
    

    jwt.verify(token, secretKey, (err, user) => {
        console.log(user);
        
        if (err) {
            return res.status(403).json({ message: "failed to authenticate" })
        }

        
        req.userId = req.userId;
        next();
    })
}


module.exports = authentication