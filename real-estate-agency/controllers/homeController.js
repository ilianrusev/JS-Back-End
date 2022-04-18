const { isUser } = require('../middleware/guards');
const { getLastListings } = require('../services/housingService');

const router = require('express').Router();


router.get('/', async (req, res) => {
    const listings = await getLastListings();

    res.render('home', { title: 'Home', listings })
})

module.exports = router