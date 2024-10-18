const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')


const secretKey = '985ac59eed6d66cd363ba2db4b9efdc83c523576c2e2f9f1d3e5cfb54d16195c'


const createUser = async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            email: req.body.email,
            password: hashPassword
        });

        const newUser = await user.save();
        console.log(newUser);

        return res.json({
            message: "User created succesfully",
            newUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const userEmail = req.body.email
        const userPassword = req.body.password

        const user = await User.findOne({ email: userEmail });
        if (!user) return res.status(400).json({ message: "user not found" });


        const password = await bcrypt.compare(userPassword, user.password)
        if (!password) return res.status(400).json({ message: "password not found" });

        const token = jwt.sign(
            { userId: user._id, userName: user.email },
            secretKey,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: "user logged in successfully", token })
    } catch (error) {
        res.status(200).json({ message: error.message })
    }
}
module.exports = { createUser, loginUser, secretKey };