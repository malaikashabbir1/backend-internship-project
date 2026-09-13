const express = require('express');
const app = express();

require('dotenv').config();
require('./config/db');
app.use(express.json())

const userRoutes = require('./routers/userRouter')

app.use('/home', (req,res) => {
    return res.json({ message :  "HOME PAGE"});
})

app.use("/users", userRoutes)


const PORT = 3000;
app.listen( PORT, ()=>{
    console.log(`The server is running on http://localhost:${PORT}`)
})