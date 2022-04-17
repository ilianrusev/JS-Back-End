const { Schema, model, Types: { ObjectId } } = require('mongoose')


const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema = new Schema({
    email: {
        type: String, required: [true, 'Email is required'], validate: {
            validator(value) {
                return EMAIL_PATTERN.test(value);
            },
            message: 'Email must be valid and contain only english letters!'
        }
    },
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