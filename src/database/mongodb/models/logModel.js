const mongoose   = require('mongoose');
const { Schema } = mongoose;

//Create the Logs Schema
const schema = new Schema({
    index:      { required: true,  type: String },
    ipsource:   { required: false, type: String },
    ipdest:     { required: false, type: String },
    dato:       { required: false, type: String }
});

module.exports = mongoose.model("LogA",schema);