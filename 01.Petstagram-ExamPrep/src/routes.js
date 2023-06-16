const router = require('express').Router();

const homeController = require('./controllers/homeController');
const petsController = require('./controllers/petsController');
const userController = require('./controllers/userController')

router.use(homeController);
router.use('/pets', petsController);
router.use('/users', userController);
router.get('*', (req, res) => {
    res.redirect('/404');
})

module.exports = router;