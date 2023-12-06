const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

require("dotenv").config();

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  const token = authHeader && authHeader.split(" ")[1];
  try {
    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          res.status(401).json("Token is not valid");
        } else {
          const userRole = decoded.role;
          if (userRole == "admin") {
            console.log("Vao duoc admin");
            next();
          } else if (
            userRole == "teacher" &&
            req.baseUrl.startsWith("/teacher")
          ) {
            console.log("Vao duoc teacher");
            next();
          } else if (
            userRole == "student" &&
            req.baseUrl.startsWith("/student")
          ) {
            console.log("Vao duoc student");
            next();
          } else if (req.baseUrl.startsWith("/class")) {
            next();
          } else {
            res
              .status(403)
              .json(
                "You do not have the necessary permissions to access this resource."
              );
          }
        }
      });
    } else {
      return res.status(401).json("You're not authenticated");
    }
  } catch (error) {
    return res.sendStatus(403);
  }
};
