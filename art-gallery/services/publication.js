const Publication = require('../models/Publication')

async function getAll() {
    return Publication.find({}).lean()
}

async function createPub(publication) {
    const result = new Publication(publication)
    await result.save();

    return result
}

async function getPubById(id) {
    return Publication.findById(id)
        .populate({ path: 'author', select: 'username address' })
        .populate({ path: 'sharedUsers', select: 'username' })
        .lean()
}

async function deletePub(id) {
    return Publication.findByIdAndDelete(id)
}

module.exports = {
    getAll,
    createPub,
    getPubById,
    deletePub,
}