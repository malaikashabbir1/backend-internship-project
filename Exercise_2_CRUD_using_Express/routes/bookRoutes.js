const express = require("express");
const router = express.Router();
const { getBooks,
        getBookByID, 
        addBook,
        deleteBook,
        updateBookByPatch,
        updateBookByPut} = require('../controllers/bookController')

const {validateBook, validateBookId} = require('../middlewares/bookMiddleware')


router.get("/", getBooks);

router.get("/:id" ,validateBookId, getBookByID);

router.post( "/" , validateBook, addBook );

router.delete ( "/:id", validateBookId, deleteBook );

router.patch( '/:id' , validateBookId, updateBookByPatch);

router.put( '/:id' ,validateBookId, validateBook, updateBookByPut );

module.exports = router;