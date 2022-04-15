const userController = require('../controllers/user')
const homeController = require('../controllers/home')


module.exports =(app) => {
    app.use(userController);
    app.use(homeController);
}