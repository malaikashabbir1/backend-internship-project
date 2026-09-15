const  userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const getAdminDashboard = async (req, res) => {

    try{   
        const admin = await userModel.findById(req.user.userId).select("-password");
        const role = req.user.role;

        return res.status(200).json( {
            message: "Authenticated Admin",
            user: admin,
            user_role: role
        })
    }
    catch(error){
        console.log(error)
        return res.status(401).json({
            message: "Route is protected,You are not allowed to get adminDashboard. "
        })

    }
}

module.exports = {getAdminDashboard};