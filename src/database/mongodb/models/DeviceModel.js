const mongoose   = require('mongoose');
const { Schema } = mongoose;

//Create the Logs Schema
const schema = new Schema({
    index    : { required: true,  type: Number },
    ipsource : { required: true,  type: String },
    hostname : { required: true,  type: String },
    OpSystem : { required: false, type: String },
    LastConn : { required: true,  type: Date , default: Date.now()},
    State    : { required: false, type: String }
});

module.exports = mongoose.model("Device", schema);