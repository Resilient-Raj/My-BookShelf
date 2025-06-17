import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { getBooks, borrowBook, returnBook, addNote, getNotes } from '../services/api';

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  quantity: number;
}

interface Note {
  id: number;
  note: string;
  created_at: string;
}

const StudentDashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [noteText, setNoteText] = useState('');
  const [bookNotes, setBookNotes] = useState<Note[]>([]);
  const [notesOpen, setNotesOpen] = useState(false);

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

  const handleBorrow = async (book: Book) => {
    try {
      await borrowBook(book.id);
      loadBooks();
    } catch (error) {
      console.error('Error borrowing book:', error);
    }
  };

  const handleReturn = async (book: Book) => {
    try {
      await returnBook(book.id);
      loadBooks();
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  const handleOpenNotes = async (book: Book) => {
    setSelectedBook(book);
    try {
      const notes = await getNotes(book.id);
      setBookNotes(notes);
      setNotesOpen(true);
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const handleAddNote = async () => {
    if (selectedBook && noteText.trim()) {
      try {
        await addNote(selectedBook.id, noteText);
        const notes = await getNotes(selectedBook.id);
        setBookNotes(notes);
        setNoteText('');
      } catch (error) {
        console.error('Error adding note:', error);
      }
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container 
      sx={{ 
        py: 4,
        backgroundColor: 'background.default',
        minHeight: '100vh'
      }}>
      <TextField
        fullWidth
        label="Search books..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
      />
      <Grid container spacing={4}>
        {filteredBooks.map((book) => (
          <Grid item component="div" key={book.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Author: {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ISBN: {book.isbn}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Available: {book.quantity}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => handleBorrow(book)}
                  disabled={book.quantity === 0}
                >
                  Borrow
                </Button>
                <Button size="small" onClick={() => handleReturn(book)}>
                  Return
                </Button>
                <Button size="small" onClick={() => handleOpenNotes(book)}>
                  Notes
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={notesOpen} onClose={() => setNotesOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedBook?.title} - Notes</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Add a note..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            sx={{ mb: 2 }}
          />
          {bookNotes.map((note) => (
            <Card key={note.id} sx={{ mb: 1 }}>
              <CardContent>
                <Typography variant="body2">{note.note}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(note.created_at).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNotesOpen(false)}>Close</Button>
          <Button onClick={handleAddNote} variant="contained">
            Add Note
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default StudentDashboard;
