const { isUser } = require('../middleware/guards');
const { getAll } = require('../services/publication');
const { getUserById } = require('../services/user');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const publications = await getAll()
    publications.forEach(p => {
            p.count = p.sharedUsers.length
    })
    res.render('home', { title: 'Home Page', publications })
})

router.get('/gallery', async (req, res) => {
    const publications = await getAll()

    res.render('gallery', { title: 'Gallery', publications })
})

router.get('/profile', isUser(), async (req, res) => {
    const userId = req.session.user._id
    const user = await getUserById(userId)
    console.log(user);
    res.render('profile', { title: 'Profile Page', user })
})


module.exports = router