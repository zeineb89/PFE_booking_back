var express = require('express');
var router = express.Router();
const carController = require('../controllers/cars');

router.post("/addCar",carController.createCar);
router.get('/firebase',carController.fireData);
router.get('/owner/:id',carController.getCarsByOwner);
router.get('/:id',carController.getOneCar);
router.get('/',carController.getAllCars);
router.put('/:id',carController.updateCar);
router.delete('/:id',carController.deleteCar);

module.exports = router;
