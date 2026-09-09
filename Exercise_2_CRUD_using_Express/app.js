const express = require("express");
const app = express();

app.use( (req,res,next) => {
    console.log("FIRST MIDDLEWARE", req.url, req.method);
    next();
})

app.use( (req,res,next) => {
    console.log("SECOND MIDDLEWARE", req.url, req.method);
    next();
})

app.get("/home", (req,res) => {
    res.json({message: "WELCOME TO HOME"})
})

const PORT = 3000;
app.listen( PORT, () => {
    console.log(`The server is running on the http://localhost:${PORT}`);
})