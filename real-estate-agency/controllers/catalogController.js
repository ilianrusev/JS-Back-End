const router = require('express').Router();


router.get('/', (req, res) => {
    res.render('catalog', { title: 'Listings' })
})

module.exports = router