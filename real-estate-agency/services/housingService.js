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
        .populate({ path: 'rents', select: 'name' })
        .lean()
}

async function editListing(id, listing) {
    const existing = await Housing.findById(id)

    existing.name = listing.name
    existing.type = listing.type
    existing.year = listing.year
    existing.city = listing.city
    existing.image = listing.image
    existing.description = listing.description
    existing.pieces = listing.pieces

    await existing.save()

}

async function deleteListing(id) {
    return Housing.findByIdAndDelete(id)
}



module.exports = {
    getListings,
    createListing,
    getLastListings,
    getListingById,
    editListing,
    deleteListing,
}