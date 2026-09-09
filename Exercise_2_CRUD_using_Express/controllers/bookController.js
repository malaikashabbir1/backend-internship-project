const findBookIndex = require('../utils/bookUtils')

const books = [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 500
    },
    {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        price: 800
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        price: 600
    },
    {
        id: 4,
        title: "The Psychology of Money",
        author: "Morgan Housel",
        price: 700
    },
    {
        id: 5,
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        price: 550
    }
];

// ________________________________________________________________ GET ALL BOOKS 
const getBooks =  (req,res) => {
    res.status(200).json(books)
}

// _______________________________________________________________ GET A BOOK BY ID by uisng req.params 
const getBookByID = (req,res) => {
    
    // req.params.id → gets the id from the URL
    const ID = Number(req.params.id);

    const book = books.find( (book) => {
        return book.id === ID 
    })

    if(!book) {
        return res.status(404).json({message: "Book not Found"})
    }

    res.status(200).json(book)  
}

// ________________________________________________________________________ POST A BOOK 
const addBook = (req, res) => {

    const newBook = req.body;

    // Incorrect as it can create new ID even after the deletion [1,2,4,5] = [1,2,4,5,5]
   // newBook.id = books.length + 1;
   
   // find the max ID number and add 1 to it  [1,2,4,5] = [1,2,4,5,6]
    newBook.id = Math.max(...books.map(book => book.id)) + 1;

    books.push(newBook);
    res.status(201).json({
        message : "Book is added successfully",
        book:  newBook
    });
}

// _______________________________________________________________________ DELETION 
// : means "this part is a dynamic value (parameter)"
const deleteBook =  (req,res) => {
    const ID = Number(req.params.id);

   // _________________ USING UTILS FUNCTION   ___________________ 
    const index = findBookIndex (books, ID);

    if(index === -1) {
        return res.status(404).json(
            { message: "Book not found"}
        )
    }

    books.splice(index,1);
    
    return res.status(200).json(
        {message: "Deleted Successfully"}
    )
}

// ____________________________________________________________________ UPDATION  using PATCH
const updateBookByPatch =  ( req, res) => {
    const ID = Number(req.params.id)

    // ____________ UTILS FUNCTION _______ 
    const index = findBookIndex (books, ID);

    if( index === -1 ) {
        return res.status(404).json({ message : "Book not Found."})
    }

    // preventing the ID from updation 
    const { id, ...fieldsToUpdate } = req.body;

    books[index] = {
        ...books[index],
        ...fieldsToUpdate
    };
    return res.status(200).json({
        message : "Successfully Updated", 
        updatedBook: books[index]
    })
    //updatedBook only contains the fields you sent in the PATCH request. 
    // books[index] contains the complete updated book
}

// _________________________________________________________________ UPDATION using PUT 
const updateBookByPut = (req, res) => {
    const ID = Number(req.params.id);

    // ____________ UTILS FUNCTION _______ 
    const index = findBookIndex (books, ID);

    if(index === -1 ) {
        return res.status(404).json({ message: "Book not Found"})
    }

    const updatedBook = req.body;
    // _________________ WITHOUT DESTRUCTURING _______________
    // books[index] = {
    //     id: ID,
    //     title: updatedBook.title,
    //     author: updatedBook.author,
    //     price: updatedBook.price
    // }

    // __________________ ASSIGNING VALUES AFTER UPDATION ___________________
    const {title, author, price} = updatedBook;
    books[index] = {
        id: ID,
        title,
        author,
        price
    }
    
    res.status(200).json({
        message: "Updated through PUT method successfully",
        updatedBook: books[index]
    })
}

module.exports = {  getBooks, getBookByID, addBook, deleteBook, updateBookByPatch, updateBookByPut}