const { isUser } = require('../middleware/guards');
const { createPub, getPubById, editPub, deletePub, sharePub } = require('../services/publication');
const { addPublication } = require('../services/user');
const mapErrors = require('../util/errorMapper');

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
        if (req.body.certificate != "Yes" || req.body.certificate != "No") {
            if (req.body.certificate == 'yes') {
                publication.certificate = "Yes"
            } else if (req.body.certificate == 'no') {
                publication.certificate = "No"
            } else {
                throw new Error('Wrong certificate value. Type "Yes" or "No"')
            }
        }

        const newPub = await createPub(publication)
        await addPublication(userId, newPub)
        res.redirect('/gallery')
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err)
        res.render('create', { title: 'Create Page', errors, publication })
    }
})

router.get('/details/:id', async (req, res) => {
    const id = req.params.id;
    const publication = await getPubById(id)

    if (req.session.user) {
        publication.hasUser = true;
        if (req.session.user._id == publication.author._id) {
            publication.isAuthor = true;
        } else {
            publication.notAuthor = true;
            publication.hasShared = publication.sharedUsers.find(v => v._id == req.session.user._id) != undefined;
        }
    }


    res.render('details', { title: 'Details Page', publication })
})

router.get('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const publication = await getPubById(id)

    if (req.session.user._id != publication.author._id) {
        return res.redirect('/login')
    }

    res.render('edit', { title: 'Edit Page', publication })
})

router.post('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    const existing = await getPubById(id)

    if (req.session.user._id != existing.author._id) {
        return res.redirect('/login')
    }

    const publication = {
        name: req.body.name,
        technique: req.body.technique,
        picture: req.body.picture,
        certificate: req.body.certificate,
    }

    try {
        await editPub(id, publication)
        res.redirect('/details/' + id)
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err)
        publication._id = id
        res.render('edit', { title: 'Edit Page', publication, errors })
    }
})

router.get('/share/:id', isUser(), async (req, res) => {
    const pubId = req.params.id
    const userId = req.session.user._id

    await sharePub(userId, pubId)
    res.redirect('/details/' + pubId)
})

router.get('/delete/:id', isUser(), async (req, res) => {
    const id = req.params.id
    const publication = await getPubById(id)

    if (req.session.user._id != publication.author._id) {
        return res.redirect('/login')
    }

    try {
        await deletePub(id);
        res.redirect('/gallery')
    } catch (err) {
        console.log(err);
        const errors = mapErrors(err)
        res.render('details', { title: 'Details Page', errors, publication })
    }

})

module.exports = router