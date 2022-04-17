const { Schema, model, } = require('mongoose')


const userSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    username: {
        type: String,
        required: [true, 'Usrname is required.'],
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