const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AdvertisingSchema = new mongoose.Schema({
    nameComp: {
        type: String,
        required: true
    },
    emailComp: {
        type: String,
        required: true
    },
    textAdver: {
        type: String,
        required: true
    },
    phoneComp: {
        type: String,
        required: true
    },
    cityComp: {
        type: String
    },
    createdat: {
        type: Date,
        default: Date.now
    }
})

module.exports = Advertising = mongoose.model('advertising',AdvertisingSchema)