function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    // Check if any borrow entry for the book is not returned
    const isBorrowed = book.borrows.some((borrow) => !borrow.returned);
    if (isBorrowed) {
      // Increment the count if the book is borrowed
      acc++;
    }
    return acc;
  }, 0);
}

function getMostCommonGenres(books) {
  const genreCounts = books.reduce((acc, book) => {
    const genre = book.genre;
    if (acc[genre]) {
      acc[genre]++;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});
  const sortedGenres = Object.keys(genreCounts).sort((genreA, genreB) => genreCounts[genreB] - genreCounts[genreA]);
  return sortedGenres.map(genre => ({ name: genre, count: genreCounts[genre] })).slice(0, 5);
}

function getMostPopularBooks(books) {
  const sortedBooks = books.sort((bookA, bookB) => bookB.borrows.length - bookA.borrows.length);
  return sortedBooks.slice(0, 5).map(book => ({ name: book.title, count: book.borrows.length }));
}

function getMostPopularAuthors(books, authors) {
  const authorCounts = books.reduce((acc, book) => {
    const authorId = book.authorId;
    if (acc[authorId]) {
      acc[authorId].count += book.borrows.length;
    } else {
      acc[authorId] = { authorId, count: book.borrows.length };
    }
    return acc;
  }, {});
  const sortedAuthors = Object.values(authorCounts).sort((authorA, authorB) => authorB.count - authorA.count);
  return sortedAuthors.map(authorData => {
    const author = authors.find(author => author.id === authorData.authorId);
    return { name: `${author.name.first} ${author.name.last}`, count: authorData.count };
  }).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};