const mongoose = require('mongoose')

const dbName = 'shared-trip'

const connectionString = `mongodb://0.0.0.0:27017/${dbName}`

module.exports = async (app) => {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected');

        mongoose.connection.on('error', (err) => {
            console.log('Database error');
            console.log(err);
        })
    } catch (err) {
        console.error('Error connecting to database')
        process.exit(1)
    }
}
