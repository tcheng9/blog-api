const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: {type: String},
        body: {type: String}, 
        comments: {type: String},
        // comments: {type: Schema.Types.ObjectId, ref: "comment", required: true},
        // timestamp: Date.now(),
        publish_status: {type: String}
    }
)

module.exports = mongoose.model('post', PostSchema);