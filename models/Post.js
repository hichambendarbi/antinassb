const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    nameSpam: {
        type: String 
    }, 
    nameUser: {
        type: String
    },
    category: {
        type: String
        // required: true
    },
    country: {
        type: String
        // required: true
    },
    text: {
        type: String
        // required: true 
    },
    telephone: {
       type: String
    },
  
        facebook: {
            type: String 
        },
        instagram: {
            type: String
        },
        website: {
            type: String
        },
    
    image: {
        type: String
    },
    status: {
        type: String
    },
    statusUser: {
        type: String
    },
    image: [{
        type: String
    }
    ],
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users' 
            }
        }
    ],

    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users' 
            },
            text: {
                type: String,
                // required: true
            },
            name: {
                type: String
            },
            image: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }

    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Post = mongoose.model('post', PostSchema)