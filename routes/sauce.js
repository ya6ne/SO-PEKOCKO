const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-c');
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');

router.post('/',auth, multer, sauceCtrl.createSauce);
router.put('/:id',auth, multer, sauceCtrl.updateSauce);
router.delete('/:id',auth, sauceCtrl.deleteSauce);
router.get('/',auth, sauceCtrl.getAllSauces);
router.get('/:id', sauceCtrl.getOneSauce);

router.post('/:id/like', sauceCtrl.likeSauce);

module.exports = router;