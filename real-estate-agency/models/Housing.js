const { Schema, model, Types: { ObjectId } } = require('mongoose')


const housingSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    year: { type: Number, required: true },
    city: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    pieces: { type: Number, required: true },
    rents: { type: [ObjectId], ref: 'User', default: [] },
    owner: { type: ObjectId, ref: 'User', required: true }
})

const Housing = model('Housing', housingSchema)

module.exports = Housing;