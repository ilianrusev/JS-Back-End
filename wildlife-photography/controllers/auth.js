const router = require('express').Router();

router.get('/register', (req, res) => {
    res.render('register', { layout: false });
});

router.get('/login', (req, res) => {
    res.render('login', { layout: false });
})


module.exports = router;