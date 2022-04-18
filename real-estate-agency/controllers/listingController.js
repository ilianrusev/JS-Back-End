const { createListing, getListings, getListingById, editListing, deleteListing } = require('../services/housingService');
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

router.get('/edit/:id', async (req, res) => {
    const listingId = req.params.id
    const listing = await getListingById(listingId)

    if (req.session.user._id != listing.owner._id) {
        return res.redirect('/login')
    }

    res.render('edit', { title: 'Edit Page', listing })
})

router.post('/edit/:id', async (req, res) => {
    const listingId = req.params.id
    const existing = await getListingById(listingId)

    if (req.session.user._id != existing.owner._id) {
        return res.redirect('/login')
    }

    const listing = {
        name: req.body.name,
        type: req.body.type,
        year: req.body.year,
        city: req.body.city,
        image: req.body.image,
        description: req.body.description,
        pieces: req.body.pieces
    }

    try {
        await editListing(listingId, listing)
        res.redirect('/details/' + listingId)
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err);
        listing._id = listingId;
        res.render('edit', { title: 'Edit Page', errors, data: listing })
    }
})

router.get('/delete/:id', async (req, res) => {
    const listingId = req.params.id
    const listing = await getListingById(listingId)

    if (req.session.user._id != existing.owner._id) {
        return res.redirect('/login')
    }

    try {
        await deleteListing(listingId)
        res.redirect('/catalog')
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err);
        res.render('details', { title: 'Details Page', errors, listing })
    }
})

module.exports = router