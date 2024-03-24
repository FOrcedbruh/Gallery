const { Schema, model } = require('mongoose');





const Picture = Schema({
    url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    },
    user: {
        type: String
    }
});

module.exports = model('Picture', Picture);