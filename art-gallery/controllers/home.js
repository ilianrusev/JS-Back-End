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

router.get('/profile', async (req, res) => {
    res.render('profile', { title: 'Profile Page'})
})


module.exports = router