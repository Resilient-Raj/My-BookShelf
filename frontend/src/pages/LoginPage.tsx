import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import { login } from '../services/api';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  React.useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(id, password, tab === 1);
      localStorage.setItem('token', response.token);
      navigate(tab === 0 ? '/student' : '/admin');
    } catch (error) {
      setError('Invalid credentials');
    }
  };  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("https://images.unsplash.com/photo-1521587760476-6c12a4b040da?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9vayUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
          zIndex: 1
        }
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={3}          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            boxShadow: '0 8px 32px rgba(139, 69, 19, 0.4)',
            borderRadius: 2,
            position: 'relative',
            zIndex: 2,
            background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
            color: '#FFF8DC',
            '& .MuiTextField-root': {
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#DEB887'
                },
                '&:hover fieldset': {
                  borderColor: '#F4A460'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FFE4B5'
                }
              },
              '& .MuiInputLabel-root': {
                color: '#DEB887',
                '&.Mui-focused': {
                  color: '#FFE4B5'
                }
              },
              '& .MuiOutlinedInput-input': {
                color: '#FFF8DC'
              }
            }
          }}
      >        <Typography 
          component="h1" 
          variant="h5" 
          sx={{ 
            color: '#FFE4B5',
            marginBottom: 2,
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          Welcome to BookShelf!
        </Typography>
        <Box sx={{ width: '100%', mb: 3 }}>
          <Tabs
            value={tab}
            onChange={(_, newValue) => setTab(newValue)}
            centered
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#DEB887'
              },
              '& .MuiTab-root': {
                color: '#DEB887',
                '&.Mui-selected': {
                  color: '#FFE4B5'
                }
              }
            }}
          >
            <Tab label="Student" />
            <Tab label="Admin" />
          </Tabs>
        </Box>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={tab === 0 ? "Student ID" : "Username"}
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
          <Button            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 3, 
              mb: 2,
              backgroundColor: '#DEB887',
              color: '#8B4513',
              '&:hover': {
                backgroundColor: '#F4A460'
              }
            }}
          >
            Sign In
          </Button>
        </form>      </Paper>
    </Container>
    </Box>
  );
};

export default LoginPage;
