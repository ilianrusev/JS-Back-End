const { Schema, model, Types: { ObjectId } } = require('mongoose')


const userSchema = new Schema({
    email: { type: String, required: [true, 'Email is required'] },
    gender: {
        type: String,
        required: [true, 'Gennder is required. Please choose "male" or "female"'],
    },
    tripHistory: { type: [ObjectId], ref: 'Trip', default: [] },
    hashedPassword: { type: String, required: true }
})

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;