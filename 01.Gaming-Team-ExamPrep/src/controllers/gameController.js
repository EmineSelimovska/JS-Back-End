const router = require('express').Router();

const gameManager = require('../manager/gameManager');
const { isAuth } = require('../middlewares/authMiddleware');
const {errMessages} = require('../utils/errorHelper');
const {getOptions} = require('../utils/viewHelper');

router.get('/catalog',async (req, res) => {
   
 const games = await gameManager.getAll();
 res.render('games/catalog', {games});
})

router.get('/create',isAuth,(req, res) => {
    res.render('games/create');
});

router.post('/create',isAuth,async (req, res) => {
    const {
         name, 
         image, 
         price,
         description,
         genre,
         platform
        } = req.body;
    
      try{

        await gameManager.create({
            name, 
            image, 
            price,
            description,
            genre,
            platform,
            owner: req.user._id,
        })

        res.redirect('/games/catalog');
      }catch(err){
        const errorMessages = errMessages(err);
        res.status(404).render('games/create', {errorMessages});
      }
      
        
});

router.get('/search',isAuth,async (req, res) => {
    const {search,platform} = req.query;

    const games = await gameManager.getAll(search,platform);
  
   res.render('games/search', {games,search, platform});
})

router.get('/details/:gameId', async (req,res) => {
    const game = await gameManager.getById(req.params.gameId).lean();
    if(!game){
     return res.redirect('/404');
    }
    const token = req.cookies['auth'];
   
    const isOwner = game.owner?.toString() === req.user?._id && token;
    const notOwner = game.owner?.toString() !== req.user?._id && token
  // if(notOwner){
   // const buy = []
    // buy.push(req.user._id);
    // game.boughtBy = buy
    //console.log(game.boughtBy);}
   //const find = game.boughtBy.includes(req.user._id);
   // console.log(find);
    res.render('games/details', {game, isOwner, notOwner});
});

router.get('/edit/:gameId',isAuth, async (req, res) => {
    const game = await gameManager.getById(req.params.gameId).lean();

    if(game.owner.toString() !== req.user?._id){
        return res.redirect('/404');
    }
   const options = getOptions(game.platform);

   res.render('games/edit', {game, options});

})
router.post('/edit/:gameId',isAuth, async(req, res) => {
    const gameData = req.body;

    await gameManager.update(req.params.gameId, gameData);

    res.redirect(`/games/details/${req.params.gameId}`);
});

router.get('/delete/:gameId', isAuth, async (req, res) => {
    await gameManager.delete(req.params.gameId);

    res.redirect('/games/catalog');
})

module.exports = router;
