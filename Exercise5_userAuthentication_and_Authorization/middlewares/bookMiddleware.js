const mongoose = require('mongoose')

// _________________ MISSING FIELDS  __________________
const validateBookFields = (req, res, next) => {
    
    const {title, author,description, publishedYear, price} = req.body;

    if( !title || !author || !description || !publishedYear ||!price ) {
        return res.status(400).json( {
            message : "Title, Author, Description, PublishedYear and Price is required."
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

const validateUpatedFields = (req, res, next) => {

    const allowedFields = [
        "title",
        "author",
        "description",
        "publishedYear",
        "price"
    ]

    //Give me the keys/property names of this object
    const receivedFields = Object.keys(req.body);

    //FILTER:   For each field, should I keep it in the invalidFields array?
    const invalidFields = receivedFields.filter(
        field => {
            return !allowedFields.includes(field)
        }
    )
    
    // allowedFields.includes(field)       "Is this field allowed?"
    // !allowedFields.includes(field)      "Is this field NOT allowed?"

    if(invalidFields.length > 0) {
        return res.status(400).json({
            message: "These fields cannot be updated",
            invalidFields: invalidFields
        });
    }

    next();
}


//exporting it as object and will use by destructing
module.exports = {validateBookFields, validateBookId, validateObjectId, validateUpatedFields};

