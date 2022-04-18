const userController = require('../controllers/userController')
const homeController = require('../controllers/homeController')
const listingController = require('../controllers/listingController')
const searchController = require('../controllers/searchController')


module.exports = (app) => {
    app.use(userController);
    app.use(homeController);
    app.use(listingController);
    app.use(searchController);


    app.all('*', (req, res) => res.render('404'));
}

