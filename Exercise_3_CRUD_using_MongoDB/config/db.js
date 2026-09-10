//Only handle the MongoDB connection
const mongoose  = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bookDB')
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));
//here booksdb is the name of the database 