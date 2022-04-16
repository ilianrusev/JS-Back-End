const Trip = require('../models/Trip')

async function getTrips() {
    return Trip.find({}).lean()
}

async function createTrip(trip) {
    const result = new Trip(trip)
    await result.save();

    return result;
}

async function getTripById(id) {
    return Trip.findById(id)
        .populate('creator', 'email')
        .populate('buddies', 'email')
        .lean()
}

async function editTrip(id, trip) {
    const existing = await Trip.findById(id);

    existing.start = trip.start
    existing.end = trip.end
    existing.date = trip.date
    existing.time = trip.time
    existing.image = trip.image
    existing.brand = trip.brand
    existing.seats = trip.seats
    existing.price = trip.price
    existing.description = trip.description

    await existing.save();
}

async function deleteTrip(id) {
    return Trip.findByIdAndDelete(id)
}


module.exports = {
    getTrips,
    createTrip,
    getTripById,
    editTrip,
    deleteTrip
}