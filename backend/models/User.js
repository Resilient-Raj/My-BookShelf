const bcrypt = require('bcryptjs');
const db = require('../config/db');

class User {
    static async createStudent(studentId, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const student = {
            id: studentId,
            student_id: studentId,
            password: hashedPassword
        };
        db.students.set(studentId, student);
        return student;
    }

    static async findStudent(studentId) {
        return db.students.get(studentId);
    }

    static async validatePassword(user, password) {
        return await bcrypt.compare(password, user.password);
    }
}

module.exports = User;
