const User = require('../models/User');

const { compare, hash } = require('bcrypt')

async function register(username, password, address) {
    const existing = await getUserByUsername(username);

    if (existing) {
        throw new Error('Already registered')
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        username,
        address,
        hashedPassword,
    })

    await user.save();

    return user;
}

async function login(username, password) {
    const user = await getUserByUsername(username);

    if (!user) {
        throw new Error('Incorrect email or password')
    }

    const hasMatch = await compare(password, user.hashedPassword);

    if (!hasMatch) {
        throw new Error('Incorrect email or password')
    }

    return user;
}

async function getUserByUsername(username) {
    const user = User.findOne({ username: new RegExp(`^${username}$`, 'i') })
    return user
}

async function getUserById(id) {
    const user = await User.findById(id)
        .lean()

    return user;
}



module.exports = {
    login,
    register,
    getUserById
}