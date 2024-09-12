const mongoose = require('mongoose');

const DB = process.env.MONGO_URI;

if (!DB) {
    throw new Error('Mongo URI is required');
}

mongoose.connect(DB)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });