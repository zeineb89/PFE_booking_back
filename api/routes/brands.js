var express = require('express');
var router = express.Router();

const brandController = require('../controllers/brands');

router.post('/addBrand',brandController.createBrand);
router.get('/:id',brandController.getOneBrand);
router.get('/',brandController.getAllBrands);
router.put('/:id',brandController.updateBrand);
router.delete('/:id',brandController.deleteBrand);

module.exports = router;