const mongoose =require('mongoose');
mongoose.set('useCreateIndex', true)

const Schema = mongoose.Schema;

rentingSchema = new Schema({ 
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Booking',
        required: true
    },
    price: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        enum : ['EUR','USD'],
        default: 'EUR'
    }
},{
    timestamps : true
});
 
const Renting = mongoose.model('Renting',rentingSchema);
module.exports = Renting;