
const  userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const getAllUsers =  async (req,res) => {
    //here - means EXCLUDE
    const users = await userModel.find().select("-password");

    if(!users) {
        return res.status(404).json({ message : "Users not Found."})
    }

    res.status(200).json(users)

}

// ________________________________________ Register New User _______________________
const registerUser = async (req, res) => {

    const userData = req.body;
    const {name, password} = userData;

    const hashPassword = await bcrypt.hash(password, 10);

    

    const  newUser = await userModel.create({
        ...userData,
        password: hashPassword
    });

    if(!newUser) {
        return res.status(400).json({ message : "User not created."})
    }

    res.status(201).json({ 
        message : "User created.",
        user:{
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
    });
    
}

// ___________________________________ LOGIN USER _____________
const loginUser = async (req, res) => {

    //findOne() returns one MongoDB document that matches your condition
    const enteredUser = await userModel.findOne({email: req.body.email})

    if(!enteredUser) {
        return res.status(404).json({message: "Email doesn't exist."})
    }

    const db_hashed_password = enteredUser.password;

    const {password} = req.body;
    const isMatch = await bcrypt.compare(password, db_hashed_password);


    if(isMatch) {

        const token = jwt.sign(
            {userId: enteredUser._id},
            //Get the value of the JWT_SECRET environment variable from .env file 
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )

        return res.status(200).json({
            message: "User is LoggedIn.",
            token: token    
        })
    }
    else {
        return res.status(401).json({message: "Password doesn't match."})
    }

} 

// _______________ GET PROFILE  _________________
const getProfile = async (req, res) => {

    //ID is stored inside the JWT payload, and after verification you extract it.
    const user = await userModel.findById(req.user.userId).select('-password');

    if(!user) {
        return res.status(404).json( {
            message: "User not Found."
        })
    }

    return res.status(200).json(user)
}








module.exports = {registerUser, getAllUsers,loginUser,getProfile};