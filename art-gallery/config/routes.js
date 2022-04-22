const userController = require('../controllers/user')
const homeController = require('../controllers/home')
const publicationController = require('../controllers/publication')

module.exports = (app) => {
    app.use(userController)
    app.use(homeController)
    app.use(publicationController)
    app.all('*', (req, res) => res.render('404', { title: '404 Page' }))
}