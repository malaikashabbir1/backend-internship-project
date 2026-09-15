const express = require("express");
const router = express.Router();
const { getBooks,getBookByID, addBook, getBookByLoggedInUser, deleteBook, updateBookByPut, updateBookByPatch } = require('../controllers/bookController')

const {validateBookFields, validateBookId, validateObjectId, validateUpatedFields } = require('../middlewares/bookMiddleware')
const {authenticateMiddleware} = require('../middlewares/authenticateMiddleware');


router.get("/", getBooks);
router.get("/createdBook", authenticateMiddleware, getBookByLoggedInUser);
router.get("/:id" ,validateBookId, getBookByID);

router.post( "/create" ,authenticateMiddleware, validateBookFields, addBook );

router.delete("/:id", authenticateMiddleware,validateObjectId, deleteBook);

router.put("/:id", authenticateMiddleware, validateObjectId, validateBookFields, updateBookByPut);

router.patch("/:id", authenticateMiddleware, validateObjectId, validateUpatedFields, updateBookByPatch);

module.exports = router;