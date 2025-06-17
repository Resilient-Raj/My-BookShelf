const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/student/login', async (req, res) => {
    try {
        const { studentId, password } = req.body;
        const student = await User.findStudent(studentId);

        if (!student || !(await User.validatePassword(student, password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: student.id, studentId: student.student_id },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;        if (username === 'admin' && password === 'admin123') {
            const token = jwt.sign(
                { id: 'admin', role: 'admin' },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '1h' }
            );
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
