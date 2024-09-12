const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const articleShema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    title: {
        type : String,
        required : true,
        trim: true
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        default: 'Anonymous',
        required: true
    },
    }, {
    timestamps: true
});

const Article = mongoose.model('Article', articleShema);

module.exports = Article;