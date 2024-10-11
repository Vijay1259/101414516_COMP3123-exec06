// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const notesRoute = require('./routes/NoteRoutes');  // Import the notes routes

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
const uri = "mongodb+srv://pateldiya3012:Tirth%403011@assignmentcluster.3mgdw.mongodb.net/week06_lab?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connected to the MongoDB Atlas Server");
})
.catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
});

// Use the notes routes
app.use('/api/v1/notes', notesRoute);  // Add this line to use the NoteRoutes

// Default route
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note-taking application - Week06 Exercise</h1>");
});

// Catch 404 errors (invalid routes)
app.use((req, res, next) => {
    res.status(404).send({ message: "Resource not found" });
});

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});