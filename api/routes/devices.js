var express = require('express');
var router = express.Router();

const deviceController = require('../controllers/devices');

router.post('/addDevice',deviceController.createDevice);
router.get('/owner/:id',deviceController.getDevicesOwner);
router.get('/:id',deviceController.getOneDevice);
router.get('/',deviceController.getAllDevices);
router.put('/:id',deviceController.updateDevice);
router.put('/lockDevice/:id',deviceController.lockDevice);
router.put('/unlockDevice/:id',deviceController.unlockDevice);
router.delete('/:id',deviceController.deleteDevice);

module.exports = router;