const express = require("express");
const router = express.Router();
const {getBooks,getBookByID, addBook, deleteBook, updateBookByPatch, updateBookByPut} = require('../controllers/bookController')

const {validateBookFields, validateBookId, validateObjectId} = require('../middlewares/bookMiddleware')


router.get("/", getBooks);

router.get("/:id" ,validateBookId, getBookByID);

router.post( "/" , validateBookFields, addBook );

router.delete( '/:id',  validateObjectId, deleteBook );

router.patch( '/:id',  validateObjectId,  updateBookByPatch);

router.put( '/:id',  validateObjectId, validateBookFields,  updateBookByPut);

module.exports = router;