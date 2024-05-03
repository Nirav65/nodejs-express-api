const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler( async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader || authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        if(!token){
            res.status(400);
            throw new Error("Access Token is missing");
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
            if(err){
                res.status(401);
                throw new Error("User is not Authorized");
            }
            req.user = decoded.user;
            next();
        });
    }
})

module.exports = validateToken;