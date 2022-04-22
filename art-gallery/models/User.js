const { Schema, model, Types: { ObjectId } } = require('mongoose')



const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    address: {
        type: String,
        required: [true, 'Address is required.'],
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