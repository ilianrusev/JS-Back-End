const mongoose = require('mongoose');

require('./Car');
require('./Accessory');

const connectionString = 'mongodb://localhost:27017/carbicle'

async function init(){
    try {
        await mongoose.connect(connectionString,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex:false
        });
        console.log('Database connected');

        mongoose.connection.on('error',(err)=>{
            console.error('Database Error');
            console.error(err);
        });
    } catch (err) {
        console.error('Error connecting to database')
        process.exit(1);
    }
}

module.exports = init;