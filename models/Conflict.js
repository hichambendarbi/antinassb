const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConflictSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    nameConflict: {
        type: String
    },
    phone: {
        type: String
    },
    linkPost: {
        type: String,
        required: true
    },
    proofConflict: {
        type: String
    },
    textConflict: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    status: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Conflict = mongoose.model('conflict', ConflictSchema)