const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: {type: String},
        text: {type: String}, 
        comments: {type: String},//placeholder for now, not sure if needed
        // comments: {type: Schema.Types.ObjectId, ref: "comment", required: true},
        // comments: [{type: Schema.Types.ObjectId, ref: "comment"}],
        // timestamp: Date.now(),
        publish_status: {type: Boolean}
    }
)

module.exports = mongoose.model('post', PostSchema);