const findBookById = (books, ID) => {
    return books.findIndex ( (book) => {
        return book.id === ID;
    })
}

module.exports = findBookById;