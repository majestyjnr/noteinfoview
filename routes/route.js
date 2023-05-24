const express = require('express');
const fs = require('fs');
const route = new express.Router()


// Read all notes
route.get('/notes', (req, res) => {
  const notes = loadAllNotes();
  res.json(notes);
});

// Read a single note
route.get('/notes/:id', (req, res) => {
  const notes = loadAllNotes();
  const note = notes.find((note) => note.id === req.params.id);
  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});

// Create a new note
route.post('/notes', (req, res) => {
  const notes = loadAllNotes();
  const newNote = {
    id: generateId(),
    text: req.body.text,
  };
  notes.push(newNote);
  saveNote(notes);
  res.status(201).json(newNote);
});

// Update a note
route.put('/notes/:id', (req, res) => {
  const notes = loadAllNotes();
  const note = notes.find((note) => note.id === req.params.id);
  if (note) {
    note.text = req.body.text;
    saveNote(notes);
    res.json(note);
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});

// Delete a note
route.delete('/notes/:id', (req, res) => {
  const notes = loadAllNotes();
  const index = notes.findIndex((note) => note.id === req.params.id);
  if (index !== -1) {
    const deletedNote = notes.splice(index, 1)[0];
    saveNote(notes);
    res.json(deletedNote);
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});


function loadAllNotes() {
    try {
      const data = fs.readFileSync('../notes.json', 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

// Save notes to the JSON file
function saveNote(notes) {
  const data = JSON.stringify(notes, null, 2);
  fs.writeFileSync('notes.json', data, 'utf8');
}

// Generate a unique ID for a new note
function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

module.exports = route