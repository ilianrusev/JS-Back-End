const { Schema, model, Types: { ObjectId } } = require('mongoose')

const URL_PATTERN = /^https?:\/\/(.+)$/


const tripSchema = new Schema({
    start: { type: String, minlength: [4, 'Start point must be at least 4 characters long!'] },
    end: { type: String, minlength: [4, 'End point must be at least 4 characters long!'] },
    date: { type: String, required: [true, 'Date  is required'] },
    time: { type: String, required: [true, 'Time is required'] },
    image: {
        type: String,
        validate: {
            validator(value) {
                return URL_PATTERN.test(value)
            },
            message: 'Invalid URL!'
        }
    },
    brand: { type: String, minlength: [4, 'Car brand must be at least 4 characters long!'] },
    seats: {
        type: Number,
        min: [0, 'Seats number must be between 0 and 4!'],
        max: [4, 'Seats number must be between 0 and 4!']
    },
    price: {
        type: Number,
        min: [1, 'Price must be between 1 and 50!'],
        max: [50, 'Price must be between 1 and 50!']
    },
    description: {
        type: String,
        minlength: [10, 'Description must be at least 10 characters long!']
    },
    creator: { type: ObjectId, ref: 'User', required: true },
    buddies: { type: [ObjectId], ref: 'User', default: [] }
})

const Trip = model('Trip', tripSchema)

module.exports = Trip;