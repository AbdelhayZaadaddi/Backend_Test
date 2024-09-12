require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

app.use(express.json());

// Connect to MongoDB
require('./db/connection');

// Define a route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// Article Routes
const articleRoutes = require('./routes/ArticleRoute');
app.use('/api', articleRoutes);

// authentication Routes
const authRoutes = require('./routes/authentication');
app.use('/api/auth', authRoutes);



// Start the server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
        process.exit(1);
    } else {
        throw err;
    }
});