const mongoose = require('mongoose');

// connect to database
const dbConfig = () => {

    const dbHost = process.env.DB_HOST;
    const dbName = process.env.DB_NAME;
    const querySuffix = process.env.DB_QUERY_SUFFIX;
    
    const connectionString = `${dbHost}/${dbName}${querySuffix}`;

    const options = {
        autoIndex: false, // don't build indexes
        reconnectInterval: 1000, // reconnect every 1s
        poolSize: 10, // maintain up to 10 socket connections
        bufferMaxEntries: 0, // if not connected, return errors immediately
        autoReconnect: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    connectDb(connectionString, options);

    return mongoose;
}

const connectDb = (conn, opts) => {
    
    mongoose.connect(conn, opts);

    // connection events
    mongoose.connection.on('connected', () =>
        console.log('Mongoose default connection open'));
    mongoose.connection.on('disconnected', () =>
        console.error('Mongoose disconnected'));
    mongoose.connection.on('error', (err) => {
        console.error(`Mongoose connection error: ${err}`)
        mongoose.disconnect()});

    // if the Node process ends, close the Mongoose connection
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.error('Mongoose disconnected by user termination');
            process.exit(0)
        });
    });
}

module.exports = dbConfig;