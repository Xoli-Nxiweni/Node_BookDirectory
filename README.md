```markdown
# Node Book Directory

## Overview
The **Node Book Directory** is a simple yet powerful RESTful API built using **Node.js**. This API enables users to efficiently manage a collection of books. It provides a straightforward way to perform CRUD (Create, Read, Update, Delete) operations on book data, which includes essential details such as:

- **Title**: The name of the book.
- **Author**: The person who wrote the book.
- **Publisher**: The entity that published the book.
- **Published Date**: The date when the book was published.
- **ISBN**: The International Standard Book Number that uniquely identifies the book.

With this API, developers can easily integrate book management functionalities into their applications.

## Tech Stack
The project utilizes the following technologies:

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine, enabling server-side scripting.
- **Express**: A minimal and flexible Node.js web application framework that provides robust features for building web and mobile applications.
- **File System (fs)**: A core Node.js module that allows interaction with the file system, utilized here for persisting book data in JSON format.

## Installation
To set up the Node Book Directory API on your local machine, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Xoli-Nxiweni/Node_BookDirectory.git
   ```

2. **Navigate into the project directory**:
   ```bash
   cd Node_BookDirectory
   ```

3. **Install the required node modules**:
   ```bash
   npm install
   ```

4. **Run the server**:
   ```bash
   node server.js
   ```

5. **Access the API**: 
   The API will be running locally at `http://localhost:4200`.

## Usage
This API exposes several endpoints to interact with the Book Directory. Here’s how you can use them:

### Endpoints
- **GET** `/books`  
  Retrieve a list of all books in the directory.

- **GET** `/books/:isbn`  
  Retrieve detailed information about a specific book using its ISBN. 

- **POST** `/books`  
  Add a new book to the directory. Make sure to include the following fields in the request body:
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
  Update an existing book's information by its ISBN. The request body should contain the fields you wish to update.

- **DELETE** `/books/:isbn`  
  Remove a book from the directory using its ISBN.

**Note**: Always ensure you run `npm install` to install the necessary modules before starting the server.

## Contact
For inquiries, feedback, or assistance, please feel free to reach out to me at: **xolinxiweni@gmail.com**.

## Collaborations
I am open to collaborations and contributions aimed at enhancing the functionality and performance of this project. If you’re interested in collaborating, don’t hesitate to contact me!

## Links
- **GitHub Repository**: [Node Book Directory](https://github.com/Xoli-Nxiweni/Node_BookDirectory.git)