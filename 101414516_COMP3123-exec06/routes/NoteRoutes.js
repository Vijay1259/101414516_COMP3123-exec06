const express = require('express');
const router = express.Router();
const Note = require('../models/NotesModel'); 
router.post('/', (req, res) => {
    if (!req.body.noteTitle || !req.body.noteDescription) {
        return res.status(400).send({
            message: "Note title and description cannot be empty"
        });
    }

    const note = new Note({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        priority: req.body.priority || 'LOW'
    });

    note.save()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the note."
            });
        });
});

// Retrieve all Notes
router.get('/', (req, res) => {
    Note.find()
        .then(notes => {
            if (notes.length === 0) {
                return res.status(404).send({ message: "No notes found." });
            }
            res.status(200).send(notes);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
});

// Retrieve a single Note by ID
router.get('/:noteId', (req, res) => {
    Note.findById(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.status(200).send(note);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        });
});
router.put('/:noteId', (req, res) => {
    if (!req.body.noteTitle || !req.body.noteDescription) {
        return res.status(400).send({
            message: "Note title and description cannot be empty"
        });
    }

    Note.findByIdAndUpdate(
        req.params.noteId,
        {
            noteTitle: req.body.noteTitle,
            noteDescription: req.body.noteDescription,
            priority: req.body.priority || 'LOW',
            dateUpdated: Date.now()
        },
        { new: true }
    )
    .then(note => {
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.status(200).send(note);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
});
router.delete('/:noteId', (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.status(200).send({ message: "Note deleted successfully!" });
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete note with id " + req.params.noteId
            });
        });
});

module.exports = router;