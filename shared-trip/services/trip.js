const Trip = require('../models/Trip')

async function getTrips() {
    return Trip.find({}).lean()
}

async function createTrip(trip) {
    const result = new Trip(trip)
    await result.save();

    return result;
}


module.exports = {
    getTrips,
    createTrip,

}