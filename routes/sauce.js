const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-c');
const auth = require('../middleware/auth');  /* inversé avec sauceCtrl */
const sauceCtrl = require('../controllers/sauce');


router.post('/',auth, multer, sauceCtrl.createSauce);
router.put('/:id',auth, multer, sauceCtrl.updateSauce);
router.delete('/:id',auth, sauceCtrl.deleteSauce);
router.get('/',auth , sauceCtrl.getAllSauces);
router.get('/:id', auth , sauceCtrl.getOneSauce);

router.post('/:id/like', auth , sauceCtrl.likeSauce);

module.exports = router;