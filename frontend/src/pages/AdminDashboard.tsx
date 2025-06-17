import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box
} from '@mui/material';
import { getBooks, addBook } from '../services/api';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  quantity: number;
}

const AdminDashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
    quantity: 1,
  });

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error('Error loading books:', error);
    }
  };

  const handleAddBook = async () => {
    try {
      await addBook(newBook);
      setOpenDialog(false);
      setNewBook({
        title: '',
        author: '',
        isbn: '',
        quantity: 1,
      });
      loadBooks();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <Container 
      maxWidth="lg"
      sx={{ 
        py: 4,
        backgroundColor: 'background.default',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: '0 auto'
      }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          width: '100%',
          backgroundColor: 'white',
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mx: 'auto'
        }}
      >
        <Box 
          sx={{
            width: '100%',
            maxWidth: '1000px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            align="center"
            sx={{ 
              color: 'primary.main',
              mb: 4,
              fontWeight: 'bold'
            }}
          >
            Admin Dashboard
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
            sx={{ 
              minWidth: '200px',
              mb: 4,
              fontSize: '1rem'
            }}
          >
            Add New Book
          </Button>

          <TableContainer 
            component={Paper} 
            sx={{ 
              boxShadow: 2,
              width: '100%',
              overflowX: 'auto',
              "& .MuiTable-root": {
                minWidth: '650px',
              },
              "& .MuiTableCell-head": {
                backgroundColor: 'primary.main',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem',
                padding: '16px',
                textAlign: 'center'
              },
              "& .MuiTableCell-body": {
                color: '#000000',
                fontSize: '1rem',
                fontWeight: 500,
                padding: '16px',
                textAlign: 'center'
              },
              "& .MuiTableRow-root:nth-of-type(odd)": {
                backgroundColor: '#faf5f0'
              },
              "& .MuiTableRow-root:nth-of-type(even)": {
                backgroundColor: 'white'
              },
              "& .MuiTableRow-root:hover": {
                backgroundColor: '#f5e6d8'
              }
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>ISBN</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell>{book.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Dialog 
          open={openDialog} 
          onClose={() => setOpenDialog(false)}
          PaperProps={{
            sx: {
              borderRadius: 2,
              minWidth: '400px',
              maxWidth: '600px',
              width: '90%',
              mx: 'auto'
            }
          }}
        >
          <DialogTitle 
            sx={{ 
              backgroundColor: 'primary.main',
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            Add New Book
          </DialogTitle>
          <DialogContent sx={{ p: 3, mt: 2 }}>
            <Box sx={{ width: '100%', maxWidth: '500px', mx: 'auto' }}>
              <TextField
                fullWidth
                label="Title"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Author"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="ISBN"
                value={newBook.isbn}
                onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                type="number"
                label="Quantity"
                value={newBook.quantity}
                onChange={(e) => setNewBook({ ...newBook, quantity: parseInt(e.target.value) })}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
            <Button 
              onClick={() => setOpenDialog(false)}
              variant="outlined"
              sx={{ minWidth: '100px', mr: 2 }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddBook}
              variant="contained"
              sx={{ minWidth: '100px' }}
            >
              Add Book
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default AdminDashboard;
