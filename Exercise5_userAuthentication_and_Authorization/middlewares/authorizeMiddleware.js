
const authorization = (req, res, next) => {

    if(req.user.role !== "admin") {
        return res.status(403).json( {
            message: "Access Denied. Only admin is allowed"
        })
    }

    next();
}

module.exports = {authorization};