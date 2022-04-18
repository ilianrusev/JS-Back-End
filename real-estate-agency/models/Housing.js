const { Schema, model, Types: { ObjectId } } = require('mongoose')

const URL_PATTERN = /^https?:\/\/(.+)$/


const housingSchema = new Schema({
    name: { type: String, minLength: [6, 'Name must be at least 6 characters long!'] },
    type: {
        type: String, required: [true, 'Type is required'],
        enum: {
            values: ['Villa', 'villa', 'apartament', 'Apartament', 'House', 'house'],
            message: 'Type must be Villa / Apartament / House'
        }
    },
    year: {
        type: Number,
        min: [1850, 'Year must be between 1850 and 2022'],
        max: [2022, 'Year must be between 1850 and 2022']
    },

    city: {
        type: String,
        minLength: [4, 'City must be at least 4 characters long!']
    },
    image: {
        type: String, validate: {
            validator(value) {
                return URL_PATTERN.test(value)
            },
            message: 'Image must be a valid URL'
        }
    },
    description: {
        type: String,
        required: true,
        maxLength: [60, 'Description can not exceed 60 characters']
    },
    pieces: {
        type: Number,
        min: [0, 'Available pieces must be between 0 and 10'],
        max: [10, 'Available pieces must be between 0 and 10']
    },
    rents: { type: [ObjectId], ref: 'User', default: [] },
    owner: { type: ObjectId, ref: 'User', required: true }
})

const Housing = model('Housing', housingSchema)

module.exports = Housing;