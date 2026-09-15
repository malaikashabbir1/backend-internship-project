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

    // _________ Here referencing it to User and for it we don't need to require the file
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Book = mongoose.model( "Book", bookSchema);
module.exports = Book;