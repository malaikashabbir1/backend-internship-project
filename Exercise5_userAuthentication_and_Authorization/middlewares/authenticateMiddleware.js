const jwt = require("jsonwebtoken");

const authenticateMiddleware = (req, res, next) => {

    // to get the token from the request 
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({
            message : "Unauthorized Access"
        })
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user =  decoded;
        next();
    }
    catch{
        return res.status(401).json({
            message: "Invalid or Expired token."
        })
    }
}

module.exports = {authenticateMiddleware};