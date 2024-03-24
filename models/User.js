const { Schema, model } = require('mongoose');



const PictureSchema = new Schema({
    title: {
        type: String
    },
    description: {
        title: String
    },
    url: {
        type: String,
        required: true
    },
    date: {
        type: String
    }
})



const FolderSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    pictures: [PictureSchema]
})




const User = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    folders: [FolderSchema]
})


module.exports = model('User', User);