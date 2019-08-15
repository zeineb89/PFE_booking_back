var express = require('express');
var router = express.Router();

const deviceController = require('../controllers/devices');

router.post('/addDevice',deviceController.createDevice);
router.get('/:id',deviceController.getOneDevice);
router.get('/',deviceController.getAllDevices);
router.put('/:id',deviceController.updateDevice);
router.put('/lockDevice/:id',deviceController.unlockDevice);
router.put('/unlockDevice/:id',deviceController.lockDevice);
router.delete('/:id',deviceController.deleteDevice);

module.exports = router;