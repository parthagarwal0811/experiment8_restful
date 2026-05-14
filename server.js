const express = require('express');
const app = express();

app.use(express.json());

// In-memory database
let books = [
    { id: 1, title: "Harry Potter", author: "J.K. Rowling" },
    { id: 2, title: "The Alchemist", author: "Paulo Coelho" }
];

app.get('/', (req, res) => {
    res.send("Book API is running 🚀");
});

// GET all books
app.get('/books', (req, res) => {
    res.json(books);
});

// GET book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if (!book) return res.status(404).send("Book not found");
    res.json(book);
});

// POST (Add new book)
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT (Update book)
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    if (!book) return res.status(404).send("Book not found");

    book.title = req.body.title;
    book.author = req.body.author;

    res.json(book);
});

// DELETE book
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id == req.params.id);
    if (index === -1) return res.status(404).send("Book not found");

    books.splice(index, 1);
    res.send("Book deleted");
});

// Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});