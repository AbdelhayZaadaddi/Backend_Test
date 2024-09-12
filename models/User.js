const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    email: {
        type : String,
        required : true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
})

const User = mongoose.model('User', userShema);

module.exports = User;