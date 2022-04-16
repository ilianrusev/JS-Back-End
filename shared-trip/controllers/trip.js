const { isUser } = require('../middleware/guards');
const { getTrips, createTrip, getTripById, deleteTrip, editTrip, joinTrip } = require('../services/trip');
const { addTrip, getUserById } = require('../services/user');
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
        const newTrip = await createTrip(trip)

        await addTrip(userId, newTrip._id)

        res.redirect('/trips')
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

router.get('/delete/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const trip = await getTripById(id)

    if (req.session.user._id != trip.creator._id) {
        return res.redirect('/login')
    }

    try {
        await deleteTrip(id)
        res.redirect('/trips')
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err)
        res.render('details', { title: 'Details Page', errors, trip })
    }

})

router.get('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const trip = await getTripById(id)

    if (req.session.user._id != trip.creator._id) {
        return res.redirect('/login')
    }

    res.render('edit', { title: 'Edit Page', trip })

})

router.post('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const existing = await getTripById(id)

    if (req.session.user._id != existing.creator._id) {
        return res.redirect('/login')
    }

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
    }

    try {
        await editTrip(id, trip)
        res.redirect('/details/' + id)
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err)
        trip._id = id
        res.render('edit', { title: 'Edit Page', trip, errors })
    }
})

router.get('/join/:id', isUser(), async (req, res) => {
    const tripId = req.params.id
    const userId = req.session.user._id

    try {
        await joinTrip(tripId, userId)
        res.redirect('/details/' + tripId)
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err)
        res.render('404', { title: '404 Page' })
    }
})

router.get('/my-profile', isUser(), async (req, res) => {
    const userId = req.session.user._id
    const user = await getUserById(userId)

    user.tripsCount = user.tripHistory.length
    if (user.tripsCount > 0) {
        user.haveTrips = true
    }
    console.log(user);

    res.render('my-profile', { title: 'My Profile', user })
})



module.exports = router;