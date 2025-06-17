const db = require('../config/db');

class Book {
    static async create(title, author, isbn, quantity) {
        const [result] = await db.execute(
            'INSERT INTO books (title, author, isbn, quantity) VALUES (?, ?, ?, ?)',
            [title, author, isbn, quantity]
        );
        return result;
    }

    static async findAll() {
        const [rows] = await db.execute('SELECT * FROM books');
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM books WHERE id = ?', [id]);
        return rows[0];
    }

    static async update(id, bookData) {
        const [result] = await db.execute(
            'UPDATE books SET title = ?, author = ?, isbn = ?, quantity = ? WHERE id = ?',
            [bookData.title, bookData.author, bookData.isbn, bookData.quantity, id]
        );
        return result;
    }

    static async borrow(bookId, studentId) {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();
            
            // Check if book is available
            const [book] = await connection.execute('SELECT quantity FROM books WHERE id = ? FOR UPDATE', [bookId]);
            if (!book[0] || book[0].quantity <= 0) {
                throw new Error('Book not available');
            }

            // Create borrow record
            await connection.execute(
                'INSERT INTO borrowed_books (book_id, student_id, borrow_date) VALUES (?, ?, NOW())',
                [bookId, studentId]
            );

            // Update book quantity
            await connection.execute(
                'UPDATE books SET quantity = quantity - 1 WHERE id = ?',
                [bookId]
            );

            await connection.commit();
            return true;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async return(bookId, studentId) {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // Update borrow record
            await connection.execute(
                'UPDATE borrowed_books SET return_date = NOW() WHERE book_id = ? AND student_id = ? AND return_date IS NULL',
                [bookId, studentId]
            );

            // Update book quantity
            await connection.execute(
                'UPDATE books SET quantity = quantity + 1 WHERE id = ?',
                [bookId]
            );

            await connection.commit();
            return true;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async addNote(bookId, studentId, note) {
        const [result] = await db.execute(
            'INSERT INTO book_notes (book_id, student_id, note) VALUES (?, ?, ?)',
            [bookId, studentId, note]
        );
        return result;
    }

    static async getNotes(bookId) {
        const [rows] = await db.execute(
            'SELECT * FROM book_notes WHERE book_id = ?',
            [bookId]
        );
        return rows;
    }
}

module.exports = Book;
