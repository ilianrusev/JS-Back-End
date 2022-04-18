const { createListing, getListings } = require('../services/housingService');
const mapErrors = require('../util/errorMapper');

const router = require('express').Router();


router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Page' })
})

router.post('/create', async (req, res) => {
    const listing = {
        name: req.body.name,
        type: req.body.type,
        year: req.body.year,
        city: req.body.city,
        image: req.body.image,
        description: req.body.description,
        pieces: req.body.pieces,
    }

    try {
        await createListing(listing)
        res.redirect('/')
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err);
        res.render('create', { title: 'Create', errors, data: listing })
    }
})

router.get('/catalog', async (req, res) => {
    const listings = await getListings();

    res.render('catalog', { title: 'Catalog', listings })
})

module.exports = router