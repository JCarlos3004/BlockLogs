const mongoose = require('mongoose');
const { Schema } = mongoose;


const schema = new Schema({
    titulo:      { required: false,  type: String },
    descripcion: { required: false,  type: String },
    etiqueta:    { required: false,  type: String },
    datos:       { required: false,  type: Array  }
});

//Creating collections in MongoDB, the collections name is Block
module.exports = mongoose.model("LogsSave", schema);