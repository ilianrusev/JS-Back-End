const Trip = require('../models/Trip')
const User = require('../models/User')


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
        .populate({ path: 'creator', select: 'email' })
        .populate({ path: 'buddies', select: 'email' })
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

async function joinTrip(tripId, userId) {
    const trip = await Trip.findById(tripId);
    const user = await User.findById(userId);

    if (trip.buddies.includes(user)) {
        throw new Error('User has already joined')
    }

    trip.buddies.push(user)
    trip.seats -= 1

    await trip.save();

}


module.exports = {
    getTrips,
    createTrip,
    getTripById,
    editTrip,
    deleteTrip,
    joinTrip

}