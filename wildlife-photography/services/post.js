const Post = require('../models/Post');



async function createPost(post) {
    const result = new Post(post)
    await result.save();

    return result;
}

async function getPosts(){
    return Post.find({});  //here you can use .lean() instead of postViewModel
}

module.exports ={
    createPost,
    getPosts,
}