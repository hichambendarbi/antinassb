const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AdsSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    nameUser: {
        type: String
    },
    from: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    timeStart: {
        type: String
    },
    timeEnd: {
        type: String
    },
    budget: {
        type: String
    },
    image: {
        type: String
    },
    link: {
        type: String,
        required: true
    },
    current: {
        type: Boolean,
        required: true
    },
    place: {
        type: Number,
        required: true
    },
    createdat: {
        type: Date,
        default: Date.now
    }
})

module.exports = Ads = mongoose.model('ads',AdsSchema)