const { createListing, getListings, getListingById } = require('../services/housingService');
const mapErrors = require('../util/errorMapper');

const router = require('express').Router();


router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Page' })
})

router.post('/create', async (req, res) => {
    const userId = req.session.user._id;

    const listing = {
        name: req.body.name,
        type: req.body.type,
        year: req.body.year,
        city: req.body.city,
        image: req.body.image,
        description: req.body.description,
        pieces: req.body.pieces,
        owner: userId,
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

router.get('/details/:id', async (req, res) => {
    const listingId = req.params.id

    const listing = await getListingById(listingId)

    if (req.session.user) {
        listing.hasUser = true
        if (listing.pieces > 0) {
            listing.hasSpace = true
        }
        if (req.session.user._id == listing.owner._id) {
            listing.isOwner = true
        } else {
            listing.notOwner = true
            listing.hasRented = listing.rents.find(l => l._id == req.session.user._id) != undefined
        }
    }

    res.render('details', { title: 'Details Page', listing })

})

module.exports = router