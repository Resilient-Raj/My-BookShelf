import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const authHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const login = async (studentId: string, password: string, isAdmin: boolean) => {
    const endpoint = isAdmin ? '/auth/admin/login' : '/auth/student/login';
    const response = await axios.post(`${API_URL}${endpoint}`, {
        studentId,
        password,
        username: isAdmin ? studentId : undefined
    });
    return response.data;
};

export const getBooks = async () => {
    const response = await axios.get(`${API_URL}/books`, {
        headers: authHeader()
    });
    return response.data;
};

export const addBook = async (bookData: any) => {
    const response = await axios.post(`${API_URL}/books`, bookData, {
        headers: authHeader()
    });
    return response.data;
};

export const borrowBook = async (bookId: number) => {
    const response = await axios.post(`${API_URL}/books/borrow/${bookId}`, {}, {
        headers: authHeader()
    });
    return response.data;
};

export const returnBook = async (bookId: number) => {
    const response = await axios.post(`${API_URL}/books/return/${bookId}`, {}, {
        headers: authHeader()
    });
    return response.data;
};

export const addNote = async (bookId: number, note: string) => {
    const response = await axios.post(`${API_URL}/books/${bookId}/notes`, { note }, {
        headers: authHeader()
    });
    return response.data;
};

export const getNotes = async (bookId: number) => {
    const response = await axios.get(`${API_URL}/books/${bookId}/notes`, {
        headers: authHeader()
    });
    return response.data;
};
