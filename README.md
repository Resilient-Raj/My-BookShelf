# Library Management System

A modern full-stack library management system built with React, TypeScript, and Node.js, featuring role-based access control and a beautiful brown-themed Material-UI interface.

## 🚀 Tech Stack

### Frontend
- **React** with **TypeScript** for type-safe development
- **Material-UI (MUI)** for responsive and customized UI components
- **Vite** for fast development and optimized builds
- Custom brown theme implementation using MUI's theming system
- React Router for navigation
- Axios for API integration

### Backend
- **Node.js** with **Express.js** framework
- **MySQL** database for data persistence
- JWT (JSON Web Token) for secure authentication
- RESTful API architecture

## ✨ Features

### Admin Dashboard
- Secure admin authentication
- Book inventory management (Add, Remove, Update)
- Real-time book availability tracking
- Centralized dashboard for all library operations

### Student Portal
- Student authentication with ID and password
- Book browsing and searching
- Book borrowing and returning functionality
- Personal reading history

### Security Features
- Role-based access control (Admin/Student)
- JWT token-based authentication
- Secure password handling
- Protected API endpoints

## 🛠️ Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/Resilient-Raj/My-BookShelf.git
cd My-BookShelf
\`\`\`

2. Install dependencies for both frontend and backend
\`\`\`bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
\`\`\`

3. Set up environment variables
Create a .env file in the backend directory with:
\`\`\`
PORT=5000
JWT_SECRET=your_jwt_secret
\`\`\`

4. Run the application
\`\`\`bash
# Start backend server (from backend directory)
npm start

# Start frontend development server (from frontend directory)
npm run dev
\`\`\`

## 🎨 UI/UX Features

- Custom brown-themed Material-UI design
- Responsive layout for all screen sizes
- Centered design elements for better visibility
- Intuitive navigation
- Clear typography with optimal readability
- Consistent color scheme throughout the application

## 🔒 API Endpoints

### Authentication
- POST /api/auth/student/login - Student login
- POST /api/auth/admin/login - Admin login

### Books
- GET /api/books - Get all books
- POST /api/books - Add new book (Admin only)
- POST /api/books/borrow/:bookId - Borrow a book
- POST /api/books/return/:bookId - Return a book

## 🌟 Future Enhancements

- Book reservation system
- Fine calculation for late returns
- Book reviews and ratings
- Email notifications
- Book recommendations
- Advanced search filters

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile devices

## 👥 Contributors

- Raj sharma - Initial work and maintenance

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details
