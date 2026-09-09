const express = require("express");
const app = express();

// ___________ For parsing JSON body
app.use(express.json())

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


app.get( "/", (req,res,next) => {
    console.log("FIRST MIDDLEWARE", req.url, req.method);
    res.send("FIRST MIDDLEWARE");
})

app.use( "/submit" , (req,res,next) => {
    console.log("SECOND MIDDLEWARE", req.url, req.method);
    res.send("SECOND MIDDLEWARE");
})

// ____________________ GET ALL BOOKS ___________________
app.get("/books", (req,res) => {
    res.status(200).json(books)
})

// ________________ GET A BOOK BY ID by uisng req.params __________________
app.get("/books/:id" , (req,res) => {
    
    // req.params.id → gets the id from the URL
    const ID = Number(req.params.id);

    if(isNaN(ID)) {
        return res.status(400).json({message: "Invalid ID"})
    }

    const book = books.find( (book) => {
        return book.id === ID 
    })

    if(!book) {
        return res.status(404).json({message: "Book not Found"})
    }

    res.status(200).json(book)  
})

// __________________ POST A BOOK  ___________________
app.post( ("/books") , (req, res) => {

    const newBook = req.body;
    newBook.id = books.length + 1;

    // _______________MISSING FIELD VALIDATION ______________
    if( !newBook.title || !newBook.author || !newBook.price) {
        return res.status(400).json({
            message : "Title, Author and Price are required"
        });
    }

    // price === undefined → "Was nothing provided?"
    // !price → "Is the value empty/falsy?"

    books.push(newBook);
    res.status(201).json({
        message : "Book is added successfully",
        book:  newBook
    });
})




const PORT = 3000;
app.listen( PORT, () => {
    console.log(`The server is running on the http://localhost:${PORT}`);
})