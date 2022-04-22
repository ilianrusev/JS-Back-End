const userController = require('../controllers/user')

module.exports = (app) => {
    app.use(userController)
    app.all('*', (req, res) => res.render('404', { title: '404 Page' }))
}