const { getListings } = require('../services/housingService');

const router = require('express').Router();


router.get('/', async (req, res) => {
    const listings = await getListings();

    res.render('catalog', { title: 'Listings', listings })
})

module.exports = router