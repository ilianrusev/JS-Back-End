const mongoose = require('mongoose')


const dbName = 'art-gallery'

const connectionString = `mongodb://0.0.0.0:27017/${dbName}`

module.exports = async (app) => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connection established');

        mongoose.connection.on('error', (err) => {
            console.log('Database error: ' + err);
        })
    } catch (err) {
        console.error('Error connecting to database');
        process.exit(1);
    }
}