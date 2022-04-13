const { register, login } = require('../services/user');
const mapErrors = require('../util/mappers');

const router = require('express').Router();

router.get('/register', (req, res) => {
    res.render('register', { layout: false });
});

router.post('/register', async (req, res) => {
    try {
        if (req.body.password == req.body.repass) {
            throw new Error('Passwords don\'t match');
        }
        const user = await register(req.body.username, req.body.password);
        rew.session.user = user;
        res.redirect('/')
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err)
        res.render('register', { layout: false, data: { username: req.body.username }, errors });
    }
})

router.get('/login', (req, res) => {
    res.render('login', { layout: false });
})

router.post('/login', async (req, res) => {
    try {
        const user = await login(req.body.username, req.body.password);
        rew.session.user = user;
        res.redirect('/')
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err)
        res.render('login', { layout: false, data: { username: req.body.username }, errors });
    }
})


module.exports = router;