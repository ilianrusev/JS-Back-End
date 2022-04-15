const { isUser } = require('../middleware/guards');
const { getTrips, createTrip, getTripById } = require('../services/trip');
const mapErrors = require('../util/errorMapper');

const router = require('express').Router();

router.get('/trips', async (req, res) => {
    const trips = await getTrips()
    res.render('trips', { title: 'Shared Trips Page', trips })
})

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Trip' })
})

router.post('/create', isUser(), async (req, res) => {
    const userId = req.session.user._id

    const trip = {
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        time: req.body.time,
        image: req.body.image,
        brand: req.body.brand,
        seats: req.body.seats,
        price: req.body.price,
        description: req.body.description,
        creator: userId
    }

    try {
        await createTrip(trip)
        res.redirect('/')
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err)
        res.render('create', { title: 'Create Page', errors, data: trip })
    }
});

router.get('/details/:id', async (req, res) => {
    const id = req.params.id;
    const trip = await getTripById(id);

    if (req.session.user) {
        trip.hasUser = true;
        if (trip.seats > 0) {
            trip.hasSeats = true;
        }
        if (req.session.user._id == trip.creator._id) {
            trip.isCreator = true;
        } else {
            trip.notCreator = true;
            trip.hasJoined = trip.buddies.find(v => v._id == req.session.user._id) != undefined;
        }

    }

    res.render('details', { title: 'Details Page', trip })

})

router.get('*', (req, res) => {
    res.render('404', { title: '404' })
})

module.exports = router;