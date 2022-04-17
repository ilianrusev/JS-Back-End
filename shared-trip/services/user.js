const User = require('../models/User');
const Trip = require('../models/Trip');

const { compare, hash } = require('bcrypt')

async function register(email, password, gender) {
    const existing = await getUserByEmail(email);

    if (existing) {
        throw new Error('Already registered')
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        email,
        gender,
        tripHistory: [],
        hashedPassword,
    })

    await user.save();

    return user;
}

async function login(email, password) {
    const user = await getUserByEmail(email);

    if (!user) {
        throw new Error('Incorrect email or password')
    }

    const hasMatch = await compare(password, user.hashedPassword);

    if (!hasMatch) {
        throw new Error('Incorrect email or password')
    }

    return user;
}

async function getUserByEmail(email) {
    const user = User.findOne({ email: new RegExp(`^${email}$`, 'i') })
    return user
}

async function getUserById(id) {
    const user = await User.findById(id)
        .populate('tripHistory','start end time date')
        .lean()

    return user;
}

async function addTrip(userId, tripId) {
    const user = await User.findOne({ _id: userId })
    const trip = await Trip.findById(tripId);

    user.tripHistory.push(trip)

    user.save()
}


module.exports = {
    login,
    register,
    addTrip,
    getUserById
}
