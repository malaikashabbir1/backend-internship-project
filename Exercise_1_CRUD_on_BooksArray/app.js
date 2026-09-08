const http = require('http');

const server = http.createServer( (req, res) => {
    res.setHeader("Content-Type", "text/html")
    res.write('<head> <title> Exercise 1 </title></head>')

    if(req.url === '/') {
        res.write('<body> <h1> Welcome to Home </h1></body>')
        return res.end();
    }

    else if( req.url === '/about') {
        res.write('<body> <h1> About Page </h1></body>')
        return res.end();
    }

    else if ( req.url === '/contact') {
        res.write('<body> <h1> Contact Page  </h1></body>')
        return res.end();
    }

    // res.write('<body> <h1> Extra Page </h1></body>')
    // res.end();
})

const PORT = 3000;
server.listen( PORT , () => {
    console.log(`The server is running on http://localhost:${PORT}`);
})