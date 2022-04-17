const userController = require('../controllers/user')
const homeController = require('../controllers/home')
const tripsController = require('../controllers/trip')


module.exports = (app) => {
    app.use(userController);
    app.use(homeController);
    app.use(tripsController);
    app.all('*', (req, res) => res.render('404', { title: '404 Page' }))

}