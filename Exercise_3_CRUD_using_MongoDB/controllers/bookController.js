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

    const bookData = req.body;

    //findOne returns one complete document
    //here sorting is in descending order _________ give the document with highest ID number 

    const lastBook = await bookModel.findOne().sort({id: -1});

    //lastBook.id + 1 if it exists, if not then assign empty to 1 
    const newId = lastBook ? lastBook.id + 1 : 1;

    const newBook = await bookModel.create({
        ...bookData,
        id: newId
    })
   
    if(!newBook) {
        return res.status(404).json({
            message : "Book not created"
        });
    }

    res.status(201).json({
        message : "Book is added successfully",
        book:  newBook
    });
}

// ________________________________________________________________DELETE  a Book 
const deleteBook = async (req, res) => {

    const Id = req.params.id;

    const del_Book = await bookModel.findByIdAndDelete(Id);
    if(!del_Book) {
        return res.status(404).json({message: "Book not Found"})
    }

     res.status(200).json({
        message : "Book is deleted successfully."
    });

}

// _________________________________________________________________ Update a Book by PUT
const updateBookByPut = async(req,res) => {
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
        {_id: Id},
        //what has been updated
        {
            ...req.body,
            id: oldBook.id
        },
        //After updating, give me the new/updated document.
        { returnDocument: 'after' }  
    );
    if(!updateBook) {
        return res.status(404).json({message: "Book not Found"})
    }

     res.status(200).json({
        message : "Book is updated successfully by PUT http Method.",
        book: updateBook
    });
}



// _________________________________________________________________ Update a Book by PATCH
const updateBookByPatch= async(req,res) => {
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

    const updateBook = await bookModel.findByIdAndUpdate(
        Id,

        //what has been updated ________Update/set only these fields.
        {$set: {
            ...req.body,
            id: oldBook.id
            }
        }, 
        
        //After updating, give me the new/updated document.
        { returnDocument: 'after' }  
    );
    if(!updateBook) {
        return res.status(404).json({message: "Book not Found"})
    }

     res.status(200).json({
        message : "Book is updated successfully by PATCH http Method.",
        book: updateBook
    });
}



module.exports = {getBooks,getBookByID, addBook, deleteBook, updateBookByPatch, updateBookByPut};