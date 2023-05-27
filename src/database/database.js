const mongoose   = require('mongoose');
require('dotenv').config();


let client;
let db;

async function connect() {
    try {
            client = await mongoose.connect(process.env.MONGODB_URI);
            db     = client.connection
            console.log("Conecction to DB have been succesfully", db.name);
            return db;
        } 
    catch(e)
        {
            console.log(e);
        }

};

module.exports = connect;