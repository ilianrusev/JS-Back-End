const { isUser } = require('../middleware/guards');
const { search } = require('../services/housingService');

const router = require('express').Router();


router.get('/search', isUser(), async (req, res) => {
    console.log(req.query);
    if (Object.keys(req.query).length == 0) {
        res.render('search', { title: 'Search Page', hasSearch: false })
    } else {
        const listings = await search(req.query)
        res.render('search', { title: 'Search Page', hasSearch: true, listings, query: req.query.search })
    }


})


module.exports = router