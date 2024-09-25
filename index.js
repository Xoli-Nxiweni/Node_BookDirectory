require('dotenv').config();
const http = require('http');
const url = require('url');
const fs = require('fs');
const PORT = process.env.PORT;


let books = [];

// Load the Books from the JSON file
try {
    const bookData = fs.readFileSync('./Books.json', 'utf8');
    books = JSON.parse(bookData);
} catch (error) {
    console.error('Error reading Books.json:', error);
}

// Helper function to parse JSON body using async/await
const parseRequestBody = async (req) => {
    let body = '';
    for await (const chunk of req) {
        body += chunk.toString();
    }
    return JSON.parse(body);
};

// Helper function to send a JSON response
const sendResponse = (res, statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};

// Helper function to persist changes to the JSON file
const saveBooksToFile = () => {
    fs.writeFileSync('./Books.json', JSON.stringify(books, null, 2), 'utf8');
};

// Validation function to check if all required book fields are present
const validateBook = ({ title, author, publisher, publishedDate, isbn }) =>
    !title || !author || !publisher || !publishedDate || !isbn
        ? 'All fields (title, author, publisher, publishedDate, and isbn) are required.'
        : null;

// HTTP server creation
const server = http.createServer(async (req, res) => {
    const isParsed = false
    const parsedUrl = url.parse(req.url, !isParsed);
    const { pathname } = parsedUrl;

    // Extract the ISBN from the URL (if present)
    const isbn = pathname.split('/')[2];

    switch (!isParsed) {
        // GET - Retrieve all books or a specific book by ISBN
        case req.method === 'GET' && pathname.startsWith('/books'):
            if (isbn) {
                const book = books.find(b => b.isbn === isbn);
                book
                    ? sendResponse(res, 200, book)
                    : sendResponse(res, 404, { message: 'Book not found' });
            } else {
                sendResponse(res, 200, books);
            }
            break;

        // POST - Add a new book
        case req.method === 'POST' && pathname === '/books':
            try {
                const newBook = await parseRequestBody(req);
                const validationError = validateBook(newBook);
                if (validationError) {
                    sendResponse(res, 400, { error: validationError });
                    return;
                }
                books.push(newBook);
                saveBooksToFile();
                sendResponse(res, 201, { message: 'Book added successfully', book: newBook });
            } catch (err) {
                sendResponse(res, 400, { error: 'Invalid JSON format' });
            }
            break;

        // PUT/PATCH - Update an existing book by ISBN
        case (req.method === 'PUT' || req.method === 'PATCH') && pathname.startsWith('/books/'):
            try {
                const updatedData = await parseRequestBody(req);
                const bookIndex = books.findIndex(b => b.isbn === isbn);
                if (bookIndex !== -1) {
                    const validationError = validateBook(updatedData);
                    if (validationError) {
                        sendResponse(res, 400, { error: validationError });
                        return;
                    }
                    books[bookIndex] = { ...books[bookIndex], ...updatedData };
                    saveBooksToFile();
                    sendResponse(res, 200, { message: 'Book updated successfully', book: books[bookIndex] });
                } else {
                    sendResponse(res, 404, { message: 'Book not found' });
                }
            } catch (err) {
                sendResponse(res, 400, { error: 'Invalid JSON format' });
            }
            break;

        // DELETE - Remove a book by ISBN
        case req.method === 'DELETE' && pathname.startsWith('/books/'):
            const bookIndex = books.findIndex(b => b.isbn === isbn);
            if (bookIndex !== -1) {
                books.splice(bookIndex, 1);
                saveBooksToFile();
                sendResponse(res, 200, { message: 'Book deleted successfully' });
            } else {
                sendResponse(res, 404, { message: 'Book not found' });
            }
            break;

        // Fallback for undefined routes
        default:
            sendResponse(res, 404, { message: 'Endpoint not found' });
            break;
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

