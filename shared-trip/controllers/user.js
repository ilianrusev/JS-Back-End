const { register, login } = require('../services/user')
const mapErrors = require('../util/errorMapper')
const { isUser, isGuest } = require('../middleware/guards')

const router = require('express').Router();

router.get('/register', isGuest(), (req, res) => {
    res.render('register', { title: 'Register Page' })
})

router.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.password.trim() == '') {
            throw new Error('Please enter password')
        } else if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match');
        }

        const user = await register(req.body.email, req.body.password, req.body.gender)

        req.session.user = user
        res.redirect('/')
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err)
        const data = {
            email: req.body.email,
            female: req.body.gender == 'female' ? 'checked' : null,
            male: req.body.gender == 'male' ? 'checked' : null

        }
        res.render('register', { title: 'Register Page', data, errors })
    }
})

router.get('/login', isGuest(), (req, res) => {
    res.render('login', { title: 'Login Page' })
})

router.post('/login', async (req, res) => {
    try {
        const user = await login(req.body.email, req.body.password)
        req.session.user = user
        res.redirect('/')
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err)
        const data = {
            email: req.body.email,
        }
        res.render('login', { title: 'Login Page', data, errors })
    }
})

router.get('/logout', isUser(), isUser(), (req, res) => {
    delete req.session.user;
    res.redirect('/')
})



module.exports = router;

