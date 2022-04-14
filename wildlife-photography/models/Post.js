const { Schema, model, Types: { ObjectId } } = require('mongoose')

const schema = new Schema({
    title: { type: String, minLength: [6, 'Title must be at least 6 characters long!'] },
    keyword: { type: String, minLength: [6, 'Keyword must be at least 6 characters long!'] },
    locations: { type: String, maxLength: [15, 'Location must be at most 15 characters long!'] },
    date: {
        type: String,
        minLength: [10, 'Date must be 10 characters long!'],
        maxLength: [10, 'Date must be 10 characters long!']
    },
    image: {
        type: String,
        validate: {
            validator(value) {
                return URL_PATTERN.test(value);
            },
            message: 'Image must be valid url!'
        }
    },
    description: { type: String, [8, 'Description must be at least 8 characters long!'] },
    author: { type: ObjectId, ref: 'User', required: true },
    votes: { type: [ObjectId], ref: 'User', default: [] },
    rating: { type: Number, default: 0 },
});

const Post = model('Post', postSchema)

module.exports = Post;