const mongoose = require('mongoose')

// _________________ MISSING FIELDS  __________________
const validateUserFields = (req, res, next) => {
    
    const {name, email, password, role} = req.body;

    if( !name || !email || !role  ) {
        return res.status(400).json( {
            message : "Name, Email, Role and Password is required."
        })
    }

    next();
}

//exporting it as object and will use by destructing
module.exports = {validateUserFields};