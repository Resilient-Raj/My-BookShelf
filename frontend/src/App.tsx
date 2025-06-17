import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B4513',
      light: '#A0522D',
      dark: '#654321',
      contrastText: '#FFF8DC',
    },
    secondary: {
      main: '#DEB887',
      light: '#F4A460',
      dark: '#D2691E',
      contrastText: '#8B4513',
    },
    background: {
      default: '#FFF8DC',
      paper: '#FEFBF3',
    },
    text: {
      primary: '#8B4513',
      secondary: '#A0522D',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        contained: {
          backgroundColor: '#DEB887',
          color: '#8B4513',
          '&:hover': {
            backgroundColor: '#F4A460',
          },
        },
        outlined: {
          borderColor: '#DEB887',
          color: '#8B4513',
          '&:hover': {
            borderColor: '#F4A460',
            backgroundColor: 'rgba(222, 184, 135, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#FEFBF3',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#8B4513',
          color: '#FFF8DC',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#FEFBF3',
          borderRadius: 12,
          border: '1px solid #DEB887',
          '&:hover': {
            boxShadow: '0 8px 16px rgba(139, 69, 19, 0.2)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#DEB887',
            },
            '&:hover fieldset': {
              borderColor: '#F4A460',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#8B4513',
            },
          },
        },
      },
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Arial", sans-serif',
    h1: {
      color: '#8B4513',
    },
    h2: {
      color: '#8B4513',
    },
    h3: {
      color: '#8B4513',
    },
    h4: {
      color: '#8B4513',
    },
    h5: {
      color: '#8B4513',
    },
    h6: {
      color: '#8B4513',
    },
  },
});

import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
