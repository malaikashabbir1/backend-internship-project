const bookModel = require('../models/bookModel')

// ______________________________________________ Get all Books 
const getBooks = async (req, res) => {
    const books = await bookModel.find();

    if(!books) {
        return res.status(404).json({message: "Books not Found"})
    }

    res.status(200).json(books)
}

// ______________________________________________ Get one Book by ID 
const getBookByID = async (req,res) => {

    const book = await bookModel.findOne({ id: req.params.id});

    if(!book) {
        return res.status(404).json({message: "Book not found"})
    }

    res.status(200).json(book)  
}

// ______________________________________________ Adding a Book 
const addBook = async (req, res) => {
    
    try {
        console.log("Authenticated user:", req.user);
        const bookData = req.body;

        //findOne returns one complete document
        //here sorting is in descending order _________ give the document with highest ID number 

        const lastBook = await bookModel.findOne().sort({id: -1});

        //lastBook.id + 1 if it exists, if not then assign empty to 1 
        const newId = lastBook ? lastBook.id + 1 : 1;

        const newBook = await bookModel.create({
            ...bookData,
            id: newId,
            //_________ GETTING FROM THE AUTHENTICATION MIDDLEWARE
            createdBy: req.user.userId
        })
   

        res.status(201).json({
            message : "Book is added successfully",
            book:  newBook
        });
    }
    catch(error) {
        console.log(error)
        return res.status(500).json({
            message : "Book Creation Failed."
        });

    }
   
}


// ______________________________________________ Getting a book by Authenticated User
const getBookByLoggedInUser = async (req, res) => {


    try{
        const createdBook = await bookModel.find({
            createdBy: req.user.userId
        })

        // as the find() returns an array so using length function 
        if(createdBook.length === 0 ){
            return res.status(200).json({
                message: "You haven't created any books yet."
            });
        }

        return res.status(200).json({
            message: "Successfully retrieved your books",
            book: createdBook
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to retrieve your books."
        });
    }
    
}


// ________________________________________________________________DELETE  a Book 
const deleteBook = async (req, res) => {

    try{

        const del_Book = await bookModel.findOneAndDelete({
            // ___________ _id is for telling which book is to be deleted____ ID from URL
            _id: req.params.id,
            // Only allow the logged-in user to delete their own book.
            // userId comes from the verified JWT payload.
            createdBy: req.user.userId
        });

        // findOneAndDelete it returns an oject
        if(!del_Book) {
            return res.status(404).json({
                message: "Book not Found or You are not the owner."
            })
        }

        return res.status(200).json({
            message : "Book is deleted successfully."
        });

    }
    catch(error) {
        console.log(error)
        return res.status(500).json({
            message : "Book's deletion is failed"
        });
    }
}

// _________________________________________________________________ Update a Book by PUT
const updateBookByPut = async(req,res) => {

    try{
        const Id = req.params.id;
        const oldBook = await bookModel.findById(Id);
        if(!oldBook) {
            return res.status(404).json({message: "Old book not Found"})
        }

        // Prevent custom ID from being changed
        if (req.body.id && req.body.id !== oldBook.id) {
            return res.status(400).json({
                message: "Book ID cannot be updated."
            });
        }


        //findOneAndReplace(filter, replacement, options)

        const updateBook = await bookModel.findOneAndReplace(
            {
                _id: Id,
                createdBy: req.user.userId 
            },
            //what has been updated
            {
                ...req.body,
                id: oldBook.id,
                createdBy: req.user.userId
            },
            //After updating, give me the new/updated document.
            { returnDocument: 'after' }  
        );

        if(!updateBook) {
            return res.status(404).json({
                message: "Book not Found or You are not the owner "
            })
        }

        res.status(200).json({
            message : "Book is updated successfully by PUT http Method.",
            book: updateBook
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Book update Failed"
        })
    }
    
}



// _________________________________________________________________ Update a Book by PATCH
const updateBookByPatch= async(req,res) => {
    try{
        const Id = req.params.id;

        const oldBook = await bookModel.findById(Id);
        if(!oldBook) {
            return res.status(404).json({message: "Old book not Found"})
        }

        // Prevent custom ID from being changed
        if (req.body.id && req.body.id !== oldBook.id) {
            return res.status(400).json({
                message: "Book ID cannot be updated."
            });
        }

        const updateBook = await bookModel.findOneAndUpdate(
            {
                _id: Id,
                createdBy: req.user.userId
            },

            //what has been updated ________Update/set only these fields.
            {$set: {
                ...req.body,

                //preventing the custom ID from changing
                id: oldBook.id
                }
            }, 
        
            //After updating, give me the new/updated document.
            { new: true}  
        );

        if(!updateBook) {
            return res.status(404).json({
                message: "Book not Found or you are not allowed to change this book."
            })
        }

        res.status(200).json({
            message : "Book is updated successfully by PATCH http Method.",
            book: updateBook
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Failed to update."
        })

    }
}




module.exports = {getBooks, getBookByID, addBook, getBookByLoggedInUser, deleteBook, updateBookByPut, updateBookByPatch}