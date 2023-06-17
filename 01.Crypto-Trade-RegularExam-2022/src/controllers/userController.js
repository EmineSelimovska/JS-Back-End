const router = require('express').Router();

const userManager = require('../manager/userManager');
const {isAuth} = require('../middlewares/authMiddleware');

const {errMessages} = require('../utils/errorHelper');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register',async (req, res) => {
    const {username, email, password, confirmPassword} = req.body;
    try{
     await userManager.register({
         username,
         email, 
         password,
         confirmPassword
        })

        res.redirect('/');
    }catch(err){
       const errorMessages = errMessages(err);
       res.status(404).render('users/register', {errorMessages});
    }
});

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.post('/login',async (req, res,next) => {
    const {username, email, password} = req.body;
    try{
      const token = await userManager.login(username, email, password);

      res.cookie('auth', token);
     
      res.redirect('/');
    }catch(err){
        const errorMessages = errMessages(err);
        res.status(404).render('users/login', {errorMessages});
    }
});

router.get('/logout',isAuth ,(req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

module.exports = router;