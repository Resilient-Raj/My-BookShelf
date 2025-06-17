const express = require('express');
const jwt = require('jsonwebtoken');
const Book = require('../models/Book');

const router = express.Router();

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

const adminAuth = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

router.get('/', auth, async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/', auth, adminAuth, async (req, res) => {
    try {
        const { title, author, isbn, quantity } = req.body;
        const result = await Book.create(title, author, isbn, quantity);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/borrow/:bookId', auth, async (req, res) => {
    try {
        const result = await Book.borrow(req.params.bookId, req.user.studentId);
        res.json({ message: 'Book borrowed successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Return a book
router.post('/return/:bookId', auth, async (req, res) => {
    try {
        const result = await Book.return(req.params.bookId, req.user.studentId);
        res.json({ message: 'Book returned successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Add a note to a book
router.post('/:bookId/notes', auth, async (req, res) => {
    try {
        const { note } = req.body;
        const result = await Book.addNote(req.params.bookId, req.user.studentId, note);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get notes for a book
router.get('/:bookId/notes', auth, async (req, res) => {
    try {
        const notes = await Book.getNotes(req.params.bookId);
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
