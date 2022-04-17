const Housing = require('../models/Housing')

async function getListings() {
    return Housing.find({}).lean()
}

async function createListing(listing) {
    const result = new Housing(listing)
    await result.save()
    return result
}



module.exports = {
    getListings,
    createListing,
}