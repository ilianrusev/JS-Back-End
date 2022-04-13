const express = require('express');
const expressConfig = require('./config/express')


start();

async function start() {
    const app = express();

    expressConfig(app);

    app.get('/', (req, res) => res.render('home', { layout: false }))

    app.listen(3000, () => 'Server running on port 3000')

};