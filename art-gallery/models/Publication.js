const { Schema, model, Types: { ObjectId } } = require('mongoose')

const URL_PATTERN = /^https?:\/\/(.+)$/

const publicationSchemna = new Schema({
    name: {
        type: String,
        minLength: [6, 'Title must be at least 6 characters long!']
    },
    technique: {
        type: String,
        required: true,
        maxLength: [15, 'Technique must be at most 15 characters long!']
    },
    picture: {
        type: String,
        validate: {
            validator(value) {
                return URL_PATTERN.test(value)
            },
            message: 'Invalid URL!'
        }
    },
    certificate: {
        type: String,
        required: true
    },
    author: { type: ObjectId, ref: 'User' },
    sharedUsers: { type: [ObjectId], ref: 'User', default: [] }
})

const Publication = model('Publication', publicationSchemna)

module.exports = Publication;