const { Schema, model, Types: { ObjectId } } = require('mongoose')

const carSchema = new Schema({
    name: { type: String, minLength: [3, 'Car listing name must be at least 3 characterst long!'] },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: 'noImage.jpg', match: [/^https?:\/\//, 'Image URL must be a valid URL'] },
    price: { type: Number, required: true, min: 0 },
    accessories: { type: [ObjectId], default: [], ref: 'Accessory' },
    isDeleted: { type: Boolean, default: false },
    owner: { type: ObjectId, ref: 'User' }
});

const Car = model('Car', carSchema);

module.exports = Car;