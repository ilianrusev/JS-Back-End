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


module.exports = {
    getTrips,
    createTrip,
    getTripById,

}