const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        body: {type: String},
        email: {type: String},
    }
)