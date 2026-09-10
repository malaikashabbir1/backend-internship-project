const express = require('express');
const app = express();
const bookRouter = require('./routes/bookRoutes');

require('./config/db')
app.use(express.json());

app.use('/home', (req,res) => {
    res.send('WELCOME HOME')
})

app.use('/books', bookRouter);

app.use('/' , (req,res) => {
    res.status(404).json({
        message: "ROUTE NOT FOUND"
    })
})



const PORT = 3000;
app.listen (PORT,  () => {
    console.log(`the server is running on http://localhost:${PORT}`)
})



