const Publication = require('../models/Publication');
const { getUserById } = require('./user');

async function getAll() {
    return Publication.find({})
        .populate('sharedUsers')
        .lean()
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

async function editPub(id, publication) {
    const existing = await Publication.findById(id);

    existing.name = publication.name
    existing.technique = publication.technique
    existing.picture = publication.picture
    existing.certificate = publication.certificate

    await existing.save()
}

async function sharePub(userId, pubId) {
    const existing = await Publication.findById(pubId);
    const user = await getUserById(userId);

    existing.sharedUsers.push(user);

    await existing.save()

}

async function deletePub(id) {
    return Publication.findByIdAndDelete(id)
}

module.exports = {
    getAll,
    createPub,
    getPubById,
    deletePub,
    editPub,
    sharePub,
}