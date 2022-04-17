const User = require('../models/User');

const { compare, hash } = require('bcrypt')

async function register(name, username, password) {
    const existing = await getUserByUsername(username)

    if (existing) {
        throw new Error('Username already exists')
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        name,
        username,
        hashedPassword
    })
    await user.save();
    return user;
}

async function login(username, password) {
    const user = await getUserByUsername(username);

    if (!user) {
        throw new Error('Incorrect username or password')
    }

    const match = await compare(password, user.hashedPassword);

    if (!match) {
        throw new Error('Incorrect username or password')
    }

    return user;
}


async function getUserByUsername(username) {
    const user = await User.findOne({ username: new RegExp(`^${email}$`, 'i') })
        .lean()

    return user;
}

module.exports = {
    login,
    register
}