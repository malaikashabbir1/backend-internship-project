// _________________ MISSING FIELDS  __________________
const validateBook = (req, res, next) => {
    
    const {title, author, price} = req.body;

    if( !title || !author || !price ) {
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
//exporting it as object and will use by destructing
module.exports = {validateBook, validateBookId};