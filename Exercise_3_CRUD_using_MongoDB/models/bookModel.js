const mongoose = require('mongoose');

// defining the schema
//Schema can define an ObjectId _id automatically:
const bookSchema = mongoose.Schema( {
    id: Number,
    title: String,
    author: String,
    description: String,
    publishedYear: Number,
    price: Number,
});

const Book = mongoose.model( "Book", bookSchema);
module.exports = Book;