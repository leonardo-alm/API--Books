const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));

const PORT = process.env.PORT || 4001;

app.use(bodyParser.json());

const bookShelves = [
  { id: 1, location: 'Bedroom' },
  { id: 2, location: 'Office' },
  { id: 3, location: 'Living Room', }
];

let nextBookShelfId = 4;

app.param('bookShelfId', (req, res, next, id) => {
  const idToFind = Number(id);
  const shelfIndex = bookShelves.findIndex(bookShelf => bookShelf.id === idToFind);
  if (shelfIndex !== -1) {
    req.bookShelf = bookShelves[shelfIndex];
    req.bookShelfIndex = shelfIndex;
    next();
  } else {
    res.status(404).send('book Shelf Not Found.');
  }
});

app.get('/book-shelves/', (req, res, next) => {
  res.send(bookShelves);
});

app.post('/book-shelves/', (req, res, next) => {
  const newShelf = req.body.bookShelf;
  newShelf.id = nextBookShelfId++;
  bookShelves.push(newShelf);
  res.send(newShelf);
});

app.get('/book-shelves/:bookShelfId', (req, res, next) => {
  res.send(req.bookShelf);
});

app.put('/book-shelves/:bookShelfId', (req, res, next) => {
  const updatedShelf = req.body.bookShelf;
  if (req.bookShelf.id !== updatedShelf.id) {
    res.status(400).send('Cannot update book shelf Id');
  } else {
    bookShelves[req.bookShelfIndex] = updatedShelf;
    res.send(bookShelves[req.bookShelfIndex]);
  }
});

app.delete('/book-shelves/:bookShelfId', (req, res, next) => {
  bookShelves.splice(req.bookShelfIndex, 1);
  res.status(204).send();
});

const shelvesRouter = require('./shelvesRouter');
// Write your code below:
app.use('/book-shelves/:bookShelfId/shelves', shelvesRouter)


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});