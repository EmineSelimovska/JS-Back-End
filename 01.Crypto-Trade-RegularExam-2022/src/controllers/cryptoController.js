const router = require('express').Router();
const cryptoManager = require('../manager/cryptoManager');
const {errMessages}  = require('../utils/errorHelper');
const {getViewOptions} = require('../utils/viewOptions');
const {isAuth} = require('../middlewares/authMiddleware');

router.get('/create',isAuth ,(req, res) => {
    res.render('crypto/create');
});

router.post('/create',isAuth ,async (req, res) => {
  const {
    name,
    imageUrl,
    price,
    description,
    payment,
    } = req.body;

    try{
        await cryptoManager.create({name,
            imageUrl,
            price,
            description,
            payment,
            owner: req.user._id
            });

            res.redirect('/crypto/catalog');
    }catch(err){
     const errorMessages = errMessages(err);
     res.render('crypto/create', {errorMessages});
    }
});

router.get('/catalog',async (req, res) => {
    const crypto = await cryptoManager.getAll();
    res.render('crypto/catalog', {crypto});
});

router.get('/details/:cryptoId', async (req, res) => {
     const crypto = await cryptoManager.getOne(req.params.cryptoId).lean();
     const isLogged = req.user?._id;
    
     const isOwner = req.user?._id == crypto.owner._id;
      const notOwner = crypto.buyACrypto.some(x => x._id == req.user?._id);
     res.render('crypto/details', {crypto, isLogged, isOwner, notOwner});
})

router.get('/buy/:cryptoId',isAuth,async (req, res) => {
    const cryptoId = req.params.cryptoId;
    const userId = req.user._id;
  try{
    const crypto = await cryptoManager.getOne(req.params.cryptoId).lean();
   
    const buy =  await cryptoManager.addBuy(cryptoId, userId);
   
   res.redirect(`/crypto/details/${cryptoId}`)
  }catch(err){
    const errorMessages = errMessages(err);
     res.render('crypto/details', {errorMessages});
  }
    
})

router.get('/delete/:cryptoId',isAuth,async (req, res) => {
    const cryptoId = req.params.cryptoId;
    try{
       await cryptoManager.delete(cryptoId);

       res.redirect('/crypto/catalog')
    }catch(err){
        const errorMessages = errMessages(err);
        res.render('crypto/catalog' , {errorMessages});
    }
})

router.get('/edit/:cryptoId',isAuth ,async (req, res) => {
    const crypto = await cryptoManager.getOne(req.params.cryptoId).lean();
     const options = getViewOptions(crypto.payment);
    
     res.render('crypto/edit', {crypto, options});
});

router.post('/edit/:cryptoId',isAuth ,async (req, res) => {
    const cryptoData = req.body;

    try{
        await cryptoManager.update(req.params.cryptoId, cryptoData);

        res.redirect(`/crypto/details/${req.params.cryptoId}`);
    }catch(err){
        const errorMessages = errMessages(err);
        res.render('crypto/edit', {errorMessages});
    }
});

router.get('/search', async (req, res) => {
    const {search, payment} = req.query;

    const crypto = await cryptoManager.getAll(search, payment);

    res.render('crypto/search', {crypto, search, payment});
})





module.exports = router;