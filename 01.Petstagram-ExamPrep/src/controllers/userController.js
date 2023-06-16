const router = require('express').Router();

const userManager = require('../manager/userManager');

const {errMessages} = require('../utils/errorHelper');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register',async (req, res) => {
    const {username, email, password, repeatPassword} = req.body;
    try{
     await userManager.register({
         username,
         email, 
         password,
         repeatPassword
        })

        res.redirect('/users/login');
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
      const token = await userManager.login(username, password);

      res.cookie('auth', token);
     
      res.redirect('/');
    }catch(err){
        const errorMessages = errMessages(err);
        res.status(404).render('users/login', {errorMessages});
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

module.exports = router;