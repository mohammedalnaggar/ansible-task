const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema ({
    
    comment: {
        type: "string",
        required: true
    },
    user_id:{
        type: "string",
        required: true,
        ref: "user"
    },
    book_id:{
        type: "string",
        required: true,
        ref: "book"
    },
})


const commentModel = mongoose.model('comment', commentSchema)
module.exports = commentModel