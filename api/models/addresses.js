const mongoose =require('mongoose');
mongoose.set('useCreateIndex', true)

const Schema = mongoose.Schema;

addressSchema = new Schema({ 
    street1: {
        type: String,
        required: true
    },
    street2: {
        type: String
    },
    zipCode: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zone: {
        type: String
    },
    country: {
        type: String,
        enum : ['TUNISIA','FRANCE'],
        default : 'FRANCE'
    }
},{
    timestamps : true
});
    
const Address = mongoose.model('Address',addressSchema);
module.exports = Address;