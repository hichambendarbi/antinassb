const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
    nameUser: {
        type: String,
        required: true
    },
    emailUser: {
        type: String,
        required: true
    },
    textUser: {
        type: String,
        required: true
    },
    phoneUser: {
        type: String
    },
    cityUser: {
        type: String
    },
    createdat: {
        type: Date,
        default: Date.now
    }
})

module.exports = Message = mongoose.model('message',MessageSchema)