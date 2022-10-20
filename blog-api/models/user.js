const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {type: String},
        password: {type: String},
        author: {type: Boolean},

    }
)

module.exports = mongoose.model('user', UserSchema);