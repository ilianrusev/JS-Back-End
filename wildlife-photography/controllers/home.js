const { getPosts } = require('../services/post');
const { postViewModel } = require('../util/mappers');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' })
})

router.get('/catalog', async (req, res) => {
    const posts = (await getPosts()).map(postViewModel);  //if you use .lean() in the post service, you dont have to map to model 
    res.render('catalog', { title: 'Catalog Page', posts })
})

module.exports = router;