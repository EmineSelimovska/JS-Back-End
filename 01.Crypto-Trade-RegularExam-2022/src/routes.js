const router = require('express').Router();

const homeController = require('./controllers/homeController');
const cryptoController = require('./controllers/cryptoController');
const userController = require('./controllers/userController')

router.use(homeController);
router.use('/crypto', cryptoController);
router.use('/users', userController);
router.get('*', (req, res) => {
    res.redirect('/404');
})

module.exports = router;