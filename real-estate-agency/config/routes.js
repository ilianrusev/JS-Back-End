const userController = require('../controllers/userController')
const catalogController = require('../controllers/catalogController')

module.exports = (app) => {
    app.use(userController);
    app.use(catalogController);
}

