const { getAll } = require('../services/publication');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const publications = await getAll()
    res.render('home', { title: 'Home Page', publications })
})

router.get('/gallery', async (req, res) => {
    const publications = await getAll()

    res.render('gallery', { title: 'Gallery', publications })
})


module.exports = router