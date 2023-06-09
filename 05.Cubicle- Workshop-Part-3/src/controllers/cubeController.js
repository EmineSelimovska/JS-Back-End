const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');
const accessoryManager = require('../managers/accessoryManager');
const {isAuth} = require('../middlewares/authMiddlewares');
const {getDifficultyOptions} = require('../utils/viewHelper');

router.get('/create',isAuth,(req,res) => {
  
    res.render('cube/create');
});

router.post('/create', isAuth,async (req,res) => {
  const {name,
     description,
     imageUrl, 
     difficultyLevel,
    } = req.body;
  
   await cubeManager.create({
     name,
     description,
     imageUrl, 
     difficultyLevel: Number(difficultyLevel),
     owner: req.user._id,
    })

    res.redirect('/');
});

router.get('/details/:cubeId', async (req,res) => {
  const cube = await cubeManager.getOneWithAccessories(req.params.cubeId).lean();
 
   if(!cube){
    return res.redirect('/404');
   }
    const isOwner = cube.owner?.toString() === req.user?._id;
   res.render('cube/details', { cube, isOwner });
});

router.get('/attach-accessory/:cubeId',isAuth, async (req, res) => {
  const cube = await cubeManager.getOne(req.params.cubeId).lean();
  const accessories = await accessoryManager.getOthers(cube.accessories).lean();

   const hasAccessories = accessories.length > 0;

  res.render('accessory/attach', { cube, accessories, hasAccessories });
})

router.post('/attach-accessory/:cubeId',isAuth, async(req,res) => {
     const {accessory: accessoryId} = req.body;
      const cubeId = req.params.cubeId
   await cubeManager.attachAccessory(cubeId, accessoryId);

   res.redirect(`/cubes/details/${cubeId}`);
});

router.get('/delete/:cubeId',isAuth,async (req, res) => {
  const cube = await cubeManager.getOne(req.params.cubeId).lean();
  const options = getDifficultyOptions(cube.difficultyLevel);
 
  res.render('cube/delete', {cube, options});
});

router.post('/delete/:cubeId',isAuth ,async (req, res) => {
  await cubeManager.delete(req.params.cubeId)


  res.redirect('/');
});

router.get('/edit/:cubeId',isAuth,async (req, res) => {
 const cube = await cubeManager.getOne(req.params.cubeId).lean();
 
 if(cube.owner.toString() !== req.user?._id){
  return res.redirect('/404');
 }

 const options = getDifficultyOptions(cube.difficultyLevel);
  res.render('cube/edit',{cube, options});
});

router.post('/edit/:cubeId',isAuth,async (req, res) => {
  const cubeData = req.body;

  await cubeManager.update(req.params.cubeId, cubeData);

  res.redirect(`/cubes/details/${req.params.cubeId}`);
})




module.exports = router;
