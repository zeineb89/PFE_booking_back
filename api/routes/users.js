var express = require('express');
var router = express.Router();

const authorize = require('../../_helpers/authorize')

const userController = require('../controllers/users');

router.post('/addUser',userController.createUser);
router.post('/auth/login',userController.authenticate);
router.get('/owners',userController.getAllOwners);
router.get('/clients',userController.getAllClients);

router.get('/:id',userController.getOneUser);
router.get('/findUser/:email',userController.getUserByEmail);
router.get('/',userController.getAllUsers);

router.put('/:id',userController.updateUser);
router.put('/validateClient/:id',userController.validateClient);
router.delete('/:id',userController.deleteUser);

module.exports = router;

/*router.post('/addUser', function(req, res, next) {
  var body = req.body
  console.log(body)
  res.send('user added !');
});

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
module.exports = router;*/
