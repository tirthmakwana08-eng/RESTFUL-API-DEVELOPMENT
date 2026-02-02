const express = require('express');
const app = express();
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.json({
        message: "Library Management API",
        endpoints: {
            books: {
                getAll: "GET /books",
                getOne: "GET /books/:id",
                create: "POST /books",
                update: "PUT /books/:id",
                delete: "DELETE /books/:id"
            }
        }
    });
});

let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, available: true },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, available: true }
];

// CREATE - Add new book
app.post('/books', (req, res) => {
    const book = { id: books.length + 1, ...req.body };
    books.push(book);
    res.status(201).json(book);
});

// READ - Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// READ - Get single book
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);
    book ? res.json(book) : res.status(404).json({ error: "Book not found" });
});

// UPDATE - Modify book
app.put('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: "Book not found" });
    books[index] = { ...books[index], ...req.body };
    res.json(books[index]);
});

// DELETE - Remove book
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: "Book not found" });
    books.splice(index, 1);
    res.json({ message: "Book deleted" });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));