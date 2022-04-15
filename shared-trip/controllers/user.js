const { register, login } = require('../services/user')
const mapErrors = require('../util/errorMapper')
const { isUser, isGuest } = require('../middleware/guards')

const router = require('express').Router();

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register Page' })
})

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' })
})

module.exports = router;

