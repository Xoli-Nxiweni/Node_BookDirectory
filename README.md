---

## Node Book Directory

### Overview
The **Node Book Directory** is a lightweight RESTful API developed using **Node.js** to manage a collection of books. This project demonstrates proficiency in handling HTTP requests and responses, validating data, and managing book entries via endpoints.

This API supports full **CRUD** (Create, Read, Update, Delete) operations for books, focusing on key details:

- **Title**: The name of the book.
- **Author**: The writer of the book.
- **Publisher**: The entity responsible for publishing the book.
- **Published Date**: The release date of the book.
- **ISBN**: The unique identifier for books (International Standard Book Number).

This API allows developers to seamlessly integrate book management features into their applications.

### Task Objective
This project was created as part of an assignment to build a simple API for a **Book Directory** using **Node.js**. The task focused on managing HTTP methods, validating data, and handling structured data exchange. 

#### **API Requirements**:
- **Fields**: Each book entry includes the following required fields:
  - Book Title
  - Author
  - Publisher
  - Published Date
  - ISBN (must follow valid ISBN format)
- **Endpoints**: Trainees were tasked with handling multiple endpoints using the built-in **Node.js** HTTP module:
  - **GET**: Retrieve all books or search for a book by ISBN.
  - **POST**: Add a new book to the directory.
  - **PUT/PATCH**: Update book details using its ISBN.
  - **DELETE**: Remove a book from the directory by its ISBN.
- **Data Exchange**: The API uses JSON to send and receive data. All incoming requests are parsed to JSON format and validated before processing.
- **Error Handling**: Includes validation checks (e.g., ISBN format, required fields) and appropriate HTTP status codes for errors (400 Bad Request, 404 Not Found, etc.).

---

### Tech Stack
The project leverages the following technologies:
- **Node.js**: JavaScript runtime for building server-side applications.
- **File System (fs)**: Core Node.js module for interacting with the file system, storing book data in JSON format.

---

### Installation
To run the Node Book Directory API locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Xoli-Nxiweni/Node_BookDirectory.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd Node_BookDirectory
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Create a `.env` file for environment variables** (Optional but recommended):
   ```bash
   echo "PORT=8080" > .env
   ```

5. **Run the server**:
   ```bash
   node server.js
   ```

6. **Access the API**:
   The API will run locally at `http://localhost:8080` (or the port defined in `.env`).

---

### Usage

The API provides several endpoints to manage the book directory:

#### Endpoints

- **GET** `/books`  
  Retrieve a list of all books.

- **GET** `/books/:isbn`  
  Retrieve details of a specific book by its ISBN.

- **POST** `/books`  
  Add a new book. The request body should include:
  ```json
  {
      "title": "Book Title",
      "author": "Author Name",
      "publisher": "Publisher Name",
      "publishedDate": "YYYY-MM-DD",
      "isbn": "9781234567890"
  }
  ```

- **PUT** `/books/:isbn`  
  Update the details of an existing book using its ISBN. The request body should contain the fields to be updated.

- **DELETE** `/books/:isbn`  
  Remove a book from the directory by its ISBN.

---

### Error Handling

- **404 Not Found**: Returned if a book with the specified ISBN is not found.
- **400 Bad Request**: Returned for invalid input, such as missing required fields or incorrect JSON format.

---

### Example Requests

#### Adding a Book (POST)
```bash
curl -X POST http://localhost:8080/books -H "Content-Type: application/json" -d '{
  "title": "Things Fall Apart",
  "author": "Chinua Achebe",
  "publisher": "Heinemann",
  "publishedDate": "1958-06-17",
  "isbn": "9780435905255"
}'
```

#### Fetching All Books (GET)
```bash
curl http://localhost:8080/books
```

#### Fetching a Book by ISBN (GET) with Postman
```bash
http://localhost:8080/books/9780435905255
```

---

### Contribution and Collaboration
I am open to contributions and collaboration to enhance this project. If you're interested, feel free to fork the repository, create pull requests, or submit issues. You can also reach out via email for further discussions.

### Contact
For inquiries or support, reach out to **xolinxiweni@gmail.com**.

### Repository
```
https://github.com/Xoli-Nxiweni/Node_BookDirectory.git
```

---
