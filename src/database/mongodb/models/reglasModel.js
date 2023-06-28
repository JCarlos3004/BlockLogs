const mongoose = require('mongoose');
const { Schema } = mongoose;

//Create the Blockchain schema
const schema = new Schema({
    nombreregla:  { required: false,  type: String },
    riesgo:       { required: false,  type: String },
    descripcion:  { required: false,  type: String },
    severidad:    { required: false,  type: String },
    ultejecucion: { required: false,  type: String },
    ultrespuesta: { required: false,  type: String },
    ultactualiza: { required: false,  type: String },
    prognumero:   { required: false,  type: String },
    progperiodo:  { required: false,  type: String },
    version:      { required: false,  type: String }
});


//Creating collections in MongoDB, the collections name is Block
module.exports = mongoose.model("Reglas", schema);
