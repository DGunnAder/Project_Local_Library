function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = books.filter(book => book.borrows.some(borrow => !borrow.returned));
  const returnedBooks = books.filter(book => !borrowedBooks.includes(book));
  return [borrowedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  const { borrows } = book;
  const borrowers = borrows.map(borrow => {
    const account = accounts.find(account => account.id === borrow.id);
    return { ...borrow, ...account };
  });
  return borrowers.slice(0, 10);
}

function getBooksBorrowedCount(books) {
  const [borrowedBooks] = partitionBooksByBorrowedStatus(books); // Get borrowed books
  return borrowedBooks.length; // Return the total number of borrowed books
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
  getBooksBorrowedCount, // Add getBooksBorrowedCount to module.exports
};