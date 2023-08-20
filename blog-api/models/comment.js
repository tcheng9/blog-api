const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        text: {type: String},
        email: {type: String},
        // postId: {type: Schema.Types.ObjectId, ref: 'post'}, 
        postId: {type:String},
        username: {type:String}

    
    }
)

module.exports = mongoose.model('comment', CommentSchema);