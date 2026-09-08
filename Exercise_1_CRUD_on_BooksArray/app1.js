const http = require('http');


const books = [
        { id: 1, title: "The Alchemist", author: "Paulo Coelho", price: 500 },
        { id: 2, title: "Atomic Habits", author: "James Clear", price: 800 },
        { id: 3, title: "1984", author: "George Orwell", price: 600 },
        { id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 450 }
    ];

const server = http.createServer( (req, res) => {

    res.setHeader("Content-Type", "application/json")

    // ____________ Get all books ________________
    if (req.method === "GET" && req.url === "/books") {
        res.statusCode = 200;
        return res.end(JSON.stringify(books));
    }
     
    //________________ Get one book based on the ID ___________
    let path = req.url.split('/')
    if( req.method === "GET" && path[1] === "books" && path[2] ) {

        //as the URL is in the string so converting it in the number
        const ID = Number(path[2])
        //find the BOOK's id entered in the URL
        const book = books.find( (book) =>  book.id === ID )

            if(!book) {
                res.statusCode = 404;
                return res.end(JSON.stringify({ message: "Book not found" }))
            }
            //return the JSON format of book
            res.statusCode = 200;
            return res.end(JSON.stringify(book));
        
    }

    //________________ Create a book ___________________

    //_______________ HARD-CODED APPROACH ____________________
    // if(req.method === "POST" && req.url === "/books") {
    //     books.push(
    //         {
    //             id: 5,
    //             title: "Peer e Kamil", 
    //             author: "Umera Ahmad",
    //             price: 1000
    //         }
    //     )
    // res.statusCode = 201;
    // return res.end( JSON.stringify({message : "Added successfully"}))
    // }


    // ________________ DYNAMIC APPROACH _________________
    if (req.method === "POST" && req.url === '/books') {

        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        })
        req.on("end", () => {
            
            //converting the JSON into string 
            const newBook = JSON.parse(body);
            newBook.id = books.length + 1;
            //adding into the books array
            books.push(newBook)
            res.statusCode = 201;
            //converting back the newBook into JSON
            res.end(JSON.stringify(newBook)) 
        })
        return;
    }



    // __________________ DELETION ________________________
    if(req.method === "DELETE" && path[1] === 'books' && path[2]) {

        // path[2] is the dynamic part of the URL which defines the ID of the URL
        let ID = Number(path[2])
        const index = books.findIndex( (book) => {
            return book.id === ID
        })

        //    -1 → no matching book was found
        if(index === -1) {
            res.statusCode = 404;
            return res.end(JSON.stringify({message: "Book not found"}));
        }

        books.splice(index, 1)

        res.statusCode = 200;
        // _________ return means:   Send the response and immediately leave this request handler
        return res.end(JSON.stringify({ message : "Deleted Successfully"} ))
    }


    // _____________________ UPDATE A BOOK ____________________
    if( req.method === "PATCH" && path[1] === 'books' && path[2]) {

        let ID = Number(path[2]);
        const index = books.findIndex( (book) => {
            return  book.id === ID;
        })

        if(index === -1) {
            res.statusCode = 404;

            return res.end(JSON.stringify({ message : "Book not found"}))
        }

        let body = "";

        
        //When ALL data has arrived → run this function.___________ asynchronous that's why we are using callback here 
        req.on( "data", (chunk) => {
            body += chunk;
        })

        req.on( "end", () => {
            const updatedBook = JSON.parse(body);
            res.statusCode = 200;
            books[index] = {
                // ___________________ books[index] here points to the array
                // ...books[index] → copy the existing book's properties.
                ...books[index],
                // ___________________ updatedBook is an object
                //...updatedBook → add/update the properties sent by the user.
                ...updatedBook
            }

            res.end(JSON.stringify(books[index]))
        })

        return;
    }


    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Route not found" }));

    
})

const PORT = 3000;
server.listen( PORT , () => {
    console.log(`The server is running on http://localhost:${PORT}`);
})