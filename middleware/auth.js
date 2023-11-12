const jwt = require("jsonwebtoken");

require('dotenv').config();

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    console.log(req.headers.token);
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token + " My token acess")
    try {
        if (token) {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) {
                    res.status(403).json("Token is not valid")
                } else {
                    req.user = user;
                    next();
                }
            })
        } else {
            return res.status(401).json("You're not authenticated");
        }


    } catch (error) {
        return res.sendStatus(403)
    }

}