var express = require('express');
var router = express.Router();

const addressController = require('../controllers/addresses');

router.post('/addAddress',addressController.createAddress);
router.get('/:id',addressController.getOneAddress);
router.get('/',addressController.getAllAddresss);
router.put('/:id',addressController.updateAddress);
router.delete('/:id',addressController.deleteAddress);
// router.delete('/:id',addressController.deleteAddress);
// router.delete('/:id',addressController.deleteAddress);



module.exports = router;