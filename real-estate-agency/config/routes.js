const userController = require('../controllers/userController')
const homeController = require('../controllers/homeController')
const listingController = require('../controllers/listingController')


module.exports = (app) => {
    app.use(userController);
    app.use(homeController);
    app.use(listingController);

    app.all('*', (req, res) => res.render('404'));
}

