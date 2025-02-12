require('dotenv').config();
const express = require('express');
const db = require('./database');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Home Route - Display all notes
app.get('/', (req, res) => {
    db.query("SELECT * FROM notes ORDER BY created_at DESC", (err, result) => {
        if (err) throw err;
        res.render('index', { notes: result });
    });
});

// Add Note Route
app.post('/add', (req, res) => {
    const { title, content } = req.body;
    db.query("INSERT INTO notes (title, content) VALUES (?, ?)", [title, content], err => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Delete Note Route
app.get('/delete/:id', (req, res) => {
    db.query("DELETE FROM notes WHERE id = ?", [req.params.id], err => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
