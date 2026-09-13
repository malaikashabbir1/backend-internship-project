const jwt = require('jsonwebtoken');
const authenticateMiddleware =  (req, res, next) =>  {

    //The client sends:   Authorization: Bearer <JWT_TOKEN> 
    //you read it from:   req.headers.authorization  
    // CAN'T TAKE IT FROM REQ.BODY
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({
            message: "Unauthorized Access"
        })
    }

    const token = authHeader.split(" ")[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();

    } catch{
        return res.status(401).json({
            message: "Invalid or Expired Token"
        })
    }
}

module.exports = {authenticateMiddleware};

