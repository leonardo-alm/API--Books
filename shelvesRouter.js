const router = require('express').Router({ mergeParams: true });

const books = [
  { id: 1, title: '1984', author: 'George Orwell', bookShelfId: 1 },
  { id: 2, title: 'Clean Code', author: 'Robert Cecil Martin', bookShelfId: 1 },
  { id: 3, title: 'Harry Potter', author: 'J.K Rowling', bookShelfId: 3 },
  { id: 4, title: 'Lord of the Rings', author: 'J. R. R. Tolkien', bookShelfId: 2 }
];

let nextBookId = 5;

router.post('/', (req, res, next) => {
  const newBook = req.body.book;
  newBook.bookShelfId = Number(req.params.bookShelfId)
  if (newBook.title && newBook.author) {
    newBook.id = nextBookId++;
    books.push(newBook);
    res.status(201).send(newBook);
  } else {
    res.status(400).send();
  }
});

router.get('/:bookId', (req, res, next) => {
  const bookId = Number(req.params.bookId);
  const bookIndex = books.findIndex(book => book.id === bookId);
  if (bookIndex !== -1) {
    res.send(books[bookIndex]);
  } else {
    res.status(404).send('book not found.');
  }
});

router.put('/:bookId', (req, res, next) => {
  const bookId = Number(req.params.id);
  const bookIndex = books.findIndex(book => book.id === bookId);
  if (bookIndex !== -1) {
    books[bookIndex] = req.body.book;
    res.send(books[bookIndex]);
  } else {
    res.status(404).send('book not found.');
  }
});

router.delete('/:bookId', (req, res, next) => {
  const bookId = Number(req.params.id);
  const bookIndex = books.findIndex(book => book.id === bookId);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('book not found.');
  }
});

module.exports = router;