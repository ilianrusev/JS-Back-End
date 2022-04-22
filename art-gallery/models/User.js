const { Schema, model, Types: { ObjectId } } = require('mongoose')



const userSchema = new Schema({
    username: {
        type: String,
        minLength: [4, 'Username must be at least 4 characters long!']
    },
    address: {
        type: String,
        required: [true, 'Address is required.'],
        maxLength: [20,'Address must be at most 20 characters long']
    },
    publications: { type: [ObjectId], ref: 'Publication', default: [] },
    hashedPassword: { type: String, required: true }
})

userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;