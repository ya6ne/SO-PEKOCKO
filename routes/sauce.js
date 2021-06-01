const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authSauce = require('../middleware/authSauce');
const multer = require('../middleware/multer-c');  
const sauceCtrl = require('../controllers/sauce');



router.post('/',auth, multer, sauceCtrl.createSauce);
router.put('/:id',auth,authSauce ,multer, sauceCtrl.updateSauce);
router.delete('/:id',auth,authSauce, sauceCtrl.deleteSauce);
router.get('/',auth, sauceCtrl.getAllSauces);
router.get('/:id',auth ,sauceCtrl.getOneSauce);

router.post('/:id/like', auth , sauceCtrl.likeSauce);

module.exports = router;