var express = require('express');
var router = express.Router();

const bookingController = require('../controllers/bookings');

router.post('/addBooking',bookingController.createBooking);
router.get('/:id',bookingController.getOneBooking);
router.get('/',bookingController.getAllBookings);
router.put('/:id',bookingController.updateBooking);
router.delete('/:id',bookingController.deleteBooking);

module.exports = router;