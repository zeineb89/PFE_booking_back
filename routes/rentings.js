var express = require('express');
var router = express.Router();

const rentingController = require('../controllers/rentings');

router.post('/addRenting',rentingController.createRenting);
router.get('/:id',rentingController.getOneRenting);
router.get('/',rentingController.getAllRentings);
router.put('/:id',rentingController.updateRenting);
router.delete('/:id',rentingController.deleteRenting);

module.exports = router;