const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register an User
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req,res) => {
    const { username, email, password } = req.body;
    if(!username && !email && !password){
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }
    const userAvailable = await User.findOne({ email });
    if(userAvailable){
        res.status(400);
        throw new Error("Email Already Exist");
    }
    const hashPassword = await bcrypt.hash(password,10);
    console.log("Hashed Password: ", hashPassword);

    const user = await User.create({
        username,
        email,
        password: hashPassword,
    });
    console.log(`Register an User ${user}`);
    if(user){
        res.status(201).json({ _id: user.id, email: user.email})
    }else{
        res.status(400);
        throw new Error("User data is not valid.");
    }
});

//@desc Login an User
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }
    const user = await User.findOne({ email });
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_KEY, { expiresIn: "1h" })
        res.status(200).json( {accessToken} )
    } else{
        res.status(401);
        throw new Error("Email / Password is incorrect.");
    }
});

//@desc Get Profile Info
//route GET /api/users/profile
//@access public
const profileUser = asyncHandler(async (req,res) => {
    res.json(req.user);
});

module.exports = { registerUser,loginUser,profileUser };