const env = require("dotenv");
const http = require("http");
const url = require("url");
const fs = require("fs");
const PORT = process.env.PORT || 8080;
env.config();

let books = [];

// Initialize the Books.json file if it doesn't exist
const initializeBooksFile = async () => {
  if (!fs.existsSync("./Books.json")) {
    await fs.promises.writeFile("./Books.json", JSON.stringify([], null, 2), "utf8");
  }
};

// Helper function to parse JSON request body
const parseRequestBody = async (request) => {
  let body = "";
  for await (const chunk of request) {
    body += chunk.toString();
  }
  return JSON.parse(body);
};

// Helper function to send a JSON response
const sendResponse = (response, statusCode, data) => {
  response.writeHead(statusCode, { "Content-Type": "application/json" });
  response.end(JSON.stringify(data));
};

// Helper function to save books to the JSON file
const saveBooksToFile = async () => {
  try {
    await fs.promises.writeFile(
      "./Books.json",
      JSON.stringify(books, null, 2),
      "utf8"
    );
  } catch (error) {
    console.error("Error saving to Books.json:", error);
  }
};

// Validation function to check if required fields are present and validate ISBN
const validateBook = ({ title, author, publisher, publishedDate, isbn }) => {
  if (!title || !author || !publisher || !publishedDate || !isbn) {
    return "All fields (title, author, publisher, publishedDate, and isbn) are required.";
  }

  // Simple regex to validate ISBN format
  const isbnRegex = /^(97(8|9))?\d{9}(\d|X)$/;
  if (!isbnRegex.test(isbn)) {
    return "Invalid ISBN format.";
  }

  return null; // Return null if validation passes
};

// HTTP server creation
const server = http.createServer(async (request, response) => {
  const parsedUrl = url.parse(request.url, true);
  const { pathname } = parsedUrl;

  // Extract the ISBN from the URL (if present)
  const isbn = pathname.split("/")[2];

  // Load books from the file only once on each request (improves efficiency)
  if (books.length === 0) {
    try {
      const bookData = await fs.promises.readFile("./Books.json", "utf8");
      books = JSON.parse(bookData);
    } catch (error) {
      console.error("Error reading Books.json:", error);
      return sendResponse(response, 500, { error: "Internal server error." });
    }
  }

  switch (true) {
    // GET - Retrieve all books or a specific book by ISBN
    case request.method === "GET" && pathname.startsWith("/books"):
      if (isbn) {
        const book = books.find((book) => book.isbn === isbn);
        book
          ? sendResponse(response, 200, book)
          : sendResponse(response, 404, { message: "Book not found" });
      } else {
        sendResponse(response, 200, books);
      }
      break;

    // POST - Add a new book
    case request.method === "POST" && pathname === "/books":
      try {
        const newBook = await parseRequestBody(request);
        const validationError = validateBook(newBook);
        if (validationError) {
          sendResponse(response, 400, { error: validationError });
          return;
        }
        const existingBook = books.find((book) => book.isbn === newBook.isbn);
        if (existingBook) {
          sendResponse(response, 400, {
            error: "Book with this ISBN already exists.",
          });
          return;
        }
        books.push(newBook);
        await saveBooksToFile();
        sendResponse(response, 201, {
          message: "Book added successfully",
          book: newBook,
        });
      } catch (err) {
        console.error("Error processing request:", err);
        sendResponse(response, 400, { error: "Invalid JSON format" });
      }
      break;

    // PUT/PATCH - Update an existing book by ISBN
    case (request.method === "PUT" || request.method === "PATCH") &&
      pathname.startsWith("/books/"):
      try {
        const updatedData = await parseRequestBody(request);
        const bookIndex = books.findIndex((book) => book.isbn === isbn);
        if (bookIndex !== -1) {
          const validationError = validateBook(updatedData);
          if (validationError) {
            sendResponse(response, 400, { error: validationError });
            return;
          }
          books[bookIndex] = { ...books[bookIndex], ...updatedData };
          await saveBooksToFile();
          sendResponse(response, 200, {
            message: "Book updated successfully",
            book: books[bookIndex],
          });
        } else {
          sendResponse(response, 404, { message: "Book not found" });
        }
      } catch (err) {
        console.error("Error processing request:", err);
        sendResponse(response, 400, { error: "Invalid JSON format" });
      }
      break;

    // DELETE - Remove a book by ISBN
    case request.method === "DELETE" && pathname.startsWith("/books/"):
      const bookIndexToDelete = books.findIndex((book) => book.isbn === isbn);
      if (bookIndexToDelete !== -1) {
        books.splice(bookIndexToDelete, 1);
        await saveBooksToFile();
        sendResponse(response, 200, { message: "Book deleted successfully" });
      } else {
        sendResponse(response, 404, { message: "Book not found" });
      }
      break;

    // Fallback for undefined routes
    default:
      sendResponse(response, 404, { message: "Endpoint not found" });
      break;
  }
});

// Start the server and initialize the Books.json file
(async () => {
  try {
    await initializeBooksFile();
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
})();
