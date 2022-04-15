const { Schema, model, Types: { ObjectId } } = require('mongoose')


const tripSchema = new Schema({
    start: { type: String, required: [true, 'Start point is required'] },
    end: { type: String, required: [true, 'End point is required'] },
    date: { type: String, required: [true, 'Date  is required'] },
    time: { type: String, required: [true, 'Time is required'] },
    image: { type: String, required: [true, 'Car image is required'] },
    brand: { type: String, required: [true, 'Car brand is required'] },
    seats: { type: Number, required: [true, 'Seats number is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    creator: { type: ObjectId, ref: 'User', required: true },
    buddies: { type: [ObjectId], ref: 'User', default: [] }
})

const Trip = model('Trip', tripSchema)

module.exports = Trip;