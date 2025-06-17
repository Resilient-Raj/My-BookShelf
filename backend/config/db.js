const db = {
    students: new Map(),
    books: new Map(),
    borrowedBooks: new Map(),
    bookNotes: new Map(),
    nextId: {
        books: 1,
        borrowedBooks: 1,
        bookNotes: 1
    }
};

db.students.set('admin', {
    id: 'admin',
    student_id: 'admin',
    password: '$2a$10$lYHgAnvNH0h5oQziPPKhPeEFZZ8B1PVbQkOWz9YB.oR5M6yjQFAQC'
});

db.books.set(1, {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    quantity: 5
});

db.books.set(2, {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    isbn: '9780451524935',
    quantity: 3
});

module.exports = db;
