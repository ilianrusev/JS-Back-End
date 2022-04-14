const { getPosts, getPostById } = require('../services/post');
const { postViewModel } = require('../util/mappers');

const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' })
})

router.get('/catalog', async (req, res) => {
    const posts = (await getPosts()).map(postViewModel);  //if you use .lean() in the post service, you dont have to map to model 
    res.render('catalog', { title: 'Catalog Page', posts })
})

router.get('/catalog/:id', async (req, res) => {
    const id = req.params.id;
    const post = postViewModel(await getPostById(id));  //if you use .lean() in the post service, you dont have to map to model 



    if (req.session.user) {
        post.hasUser = true;
        if (req.session.user._id == post.author._id) {
            post.isAuthor = true;

        }
        
    }

    res.render('details', { title: post.title, post })
})

module.exports = router;