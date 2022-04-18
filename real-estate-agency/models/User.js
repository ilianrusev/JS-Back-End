const { Schema, model } = require('mongoose')

const NAME_PATTERN = /([A-Z][a-z]+[ ]{1}[A-Z][a-z]+)/gm

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'], validate: {
            validator(value) {
                return NAME_PATTERN.test(value)
            },
            message: 'Name must be in correct format.'
        }
    },
    username: {
        type: String,
        minLength: [5, 'Usrname must be at least 5 characters long!'],
    },
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