const { Schema, model, Types: { ObjectId } } = require('mongoose')


const publicationSchemna = new Schema({
    title: { type: String, required: true },
    technique: { type: String, required: true },
    picture: { type: String, required: true },
    certificate: { type: String, required: true },
    author: { type: ObjectId, ref: 'User' },
    sharedUsers: { type: [ObjectId], ref: 'User', default: [] }
})

const Publication = model('Publication', publicationSchemna)

module.exports = Publication;