const { isUser } = require('../middleware/guards');
const { createPub, getPubById } = require('../services/publication');

const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('create', { title: 'Create Page' })
})

router.post('/create', isUser(), async (req, res) => {
    const userId = req.session.user._id;

    const publication = {
        name: req.body.name,
        technique: req.body.technique,
        picture: req.body.picture,
        certificate: req.body.certificate,
        author: userId,
    }

    try {
        const newPub = await createPub(publication)
        res.redirect('/gallery')
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err)
        res.render('create', { title: 'Create Page', errors, data: publication })
    }
})

router.get('/details/:id', async (req, res) => {
    const id = req.params.id;
    const publication = await getPubById(id)

    res.render('details', { title: 'Details Page', publication })
})


module.exports = router