const router = require('express').Router();

const {errMessages} = require('../utils/errorHelper');
const petsManager = require('../manager/petsManager');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/catalog',async (req, res) => {
  const photos = await petsManager.getAll().lean();

    res.render('pets/catalog', {photos});
})

router.get('/create',isAuth,(req, res) => {
    res.render('pets/create');
})

router.post('/create',isAuth, async (req, res) => {
    const {name, image, age, description, location} = req.body;
try{
    await petsManager.create({
        name, 
        image, 
        age, 
        description, 
        location, 
        owner: req.user._id
    })

    res.redirect('/pets/catalog');

}catch(err){
    const errorMessages = errMessages(err);
    res.status(404).render('pets/create', {errorMessages});
 }
})

router.get('/details/:photoId', async (req, res) => {
    const photoId = req.params.photoId;
   
        const photo = await petsManager.getOne(photoId).populate('commentList.user').lean();
        const isOwner = req.user?._id == photo.owner._id;
    
        res.render('pets/details', {photo, isOwner});
    
})

router.get('/delete/:photoId',isAuth,async (req, res) => {
    const photoId = req.params.photoId
    try{
        await petsManager.delete(photoId);

        res.redirect('/pets/catalog');
    }catch(err){
        const errorMessages = errMessages(err);
       res.render(`pets/details`, {errorMessages});
    }
})

router.get('/edit/:photoId',isAuth,async (req, res) => {
    const photo = await petsManager.getOne(req.params.photoId).lean();

    res.render('pets/edit', {photo});
});

router.post('/edit/:photoId',isAuth,async (req, res) => {
    const photoId = req.params.photoId;
    const photoData = req.body; 
try{
    await petsManager.update(photoId, photoData);

    res.redirect(`/pets/details/${photoId}`);
}catch(err){
    const errorMessages = errMessages(err);
    res.render(`pets/edit`, {errorMessages});
}
})

router.post('/:photoId/comments',isAuth,async (req, res) => {
    const photoId = req.params.photoId;
    const { comment } = req.body;
    const user = req.user._id;

    await petsManager.addComment(photoId, {user, comment});

    res.redirect(`/pets/details/${photoId}`);
})

router.get('/profile',isAuth,async (req, res) => {
    const photos = await petsManager.getByOwner(req.user._id).lean();

    res.render('pets/profile', {photos, photoCount: photos.length});
})

module.exports = router;