const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// route - /api/users/login - POST
// @access public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("please give email and password")
    }
    const user = await User.findOne({ email: email });
    if (user && await bcrypt.compareSync(password, user.password)) {
        const accesstoken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user._id
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        res.status(200).json({ accesstoken });
    }
    else {
        res.status(401);
        throw new Error("Invalid Credentials");
    }
    // res.send('login routes')
})

// route - /api/users/register - POST
// @access public
const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    // console.log(req.body);
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ email: email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already exists")
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    // console.log(hashedPassword);
    const newUser = await User.create({ username, email, password: hashedPassword });
    if (newUser) {
        res.status(201).json({ msg: "user created successfully", _id: newUser.id, email: newUser.email })
    }
    else {
        res.status(400);
        throw new Error("user data is not valid");
    }

    // res.status(201).json({msg : "User created successfully"});
});

// route - /api/users/current - GET
// @access private
const current = asyncHandler(async (req, res) => {
    res.status(201).json(req.user);
})


module.exports = { login, register, current };