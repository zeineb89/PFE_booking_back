const mongoose =require('mongoose');
mongoose.set('useCreateIndex', true)

const Schema = mongoose.Schema;

bookingSchema = new Schema({ 
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Car',
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    date_start: {
        type: Date,
        required: true
    },
    date_end: {
        type: Date,
        required: true
    }
},{
    timestamps : true
});

const Booking = mongoose.model('Booking',bookingSchema);
module.exports = Booking;