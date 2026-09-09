const express = require("express");
const app = express();
const bookRoutes = require('./routes/bookRoutes')

// ___________ For parsing JSON body
app.use(express.json())

// ____________ books Routes _______________
app.use('/books', bookRoutes)

app.get( "/", (req,res,next) => {
    res.send("WELCOME HOME");
})

// ________ NOT FOUND ROUTE  MIDDLEWARE ___________
app.use((req, res) => {
    res.status(404).json({
        message: "Route is not defined"
    });
});





const PORT = 3000;
app.listen( PORT, () => {
    console.log(`The server is running on the http://localhost:${PORT}`);
})