const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/user_DB')
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));
//here userDB is the name of the database 
