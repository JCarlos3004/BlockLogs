const mongoose = require('mongoose');
const { Schema } = mongoose;

//Create the Blockchain schema
const schema = new Schema({
    index:        { required: false,  type: Number },
    timestamp:    { required: false,  type: Date   },
    data:         { required: false,  type: Array  },
    previousHash: { required: false,  type: String },
    hash:         { required: false,  type: String }
});


//Creating collections in MongoDB, the collections name is Block
module.exports = mongoose.model("Node1", schema);
