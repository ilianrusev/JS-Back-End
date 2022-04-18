const Housing = require('../models/Housing')

async function getListings() {
    return Housing.find({}).lean()
}

async function getLastListings() {
    return Housing.find()
        .sort({ _id: -1 })
        .limit(3)
        .lean()
}

async function createListing(listing) {
    const result = new Housing(listing)
    await result.save()
    return result
}

async function getListingById(id) {
    return Housing.findById(id)
        .populate({ path: 'owner', select: 'name username' })
        .lean()
}



module.exports = {
    getListings,
    createListing,
    getLastListings,
    getListingById,
}