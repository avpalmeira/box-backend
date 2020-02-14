const mongoose = require('mongoose');

// connect to database
const dbConfig = () => {

    const connectionString = require('../connect'); // process.env.DB_CONN || exception
    mongoose.connect(connectionString, { useNewUrlParser: true }); // DB_NAME
}

module.exports = dbConfig;