const { isGuest, isUser } = require('../middleware/guards');
const { register, login } = require('../services/userService');
const mapErrors = require('../util/errorMapper')

const router = require('express').Router();

router.get('/login', isGuest(), (req, res) => {
    res.render('login', { title: 'Login Page' })
})

router.post('/login', isGuest(), async (req, res) => {
    try {
        const user = await login(req.body.username, req.body.password)
        req.session.user = user;
        res.redirect('/')
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err)
        res.render('login', { title: 'Login Page', errors })
    }
})

router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register Page' })
})

router.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.password.trim() === '') {
            throw new Error('Please enter password')
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match')
        }
        const user = await register(req.body.name, req.body.username, req.body.password)

        req.session.user = user
        res.redirect('/')
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err)
        const data = {
            name: req.body.name,
            username: req.body.username,
        }
        res.render('register', { title: 'Register Page', data, errors })
    }
})

router.get('/logout', isUser(), (req, res) => {
    delete req.session.user;
    res.redirect('/login');
})


module.exports = router;