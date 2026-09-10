const mongoose = require('mongoose')

// _________________ MISSING FIELDS  __________________
const validateBookFields = (req, res, next) => {
    
    const {title, author,description, publishedYear, price} = req.body;

    if( !title || !author || !description || !publishedYear ||!price ) {
        return res.status(400).json( {
            message : "Title, Author and Price is required."
        })
    }

    next();
}
//  _______________________ IsNaN Validation _______________

const validateBookId = (req, res, next) => {
    const ID = Number(req.params.id);

    if (isNaN(ID)) {
        return res.status(400).json({
            message: "Invalid ID"
        });
    }

    next();
};

const validateObjectId = (req, res, next) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            message: "Invalid ID"
        });
    }

    next();
};

//exporting it as object and will use by destructing
module.exports = {validateBookFields, validateBookId, validateObjectId};