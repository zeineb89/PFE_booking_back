const mongoose =require('mongoose');
mongoose.set('useCreateIndex', true)

const Schema = mongoose.Schema;

carSchema = new Schema({ 
    description: {
        type: String
    },
    modelDate:{
        type : Number,
        required: true
    },
    numberOfDoors: {
        type : Number,
        required: true
    },
    seatingCapacity: {
        type : Number,
        required: true
    },
    options_accessoires: [
        { 
            type: String,
            enum : ['Climatisation','Régulateur de vitesse','GPS','Lecteur CD','Entrée audio','iPod'],
        }
    ],
    price: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    address:{
        type: Object,
        required: true
    },
    available : {
        type : Boolean,
        default: true,
        required: true
    },
    energy: {
        type: String,
        enum : ['essence','diesel','electric'],
        default: 'essence'
    },
    mileage: {
        type: String,
        enum : ['0-15 000 km', '15-50 000 km', '50-100 000 km', '100-150 000 km', '150-200 000 km', '+200 000 km'],
        default: '0-15 000 km'
    },
    transmission: {
        type: String,
        enum : ['manual','automatic'],
        default: 'manual'
    },
    device: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Device',
        required: true,
        unique: true
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Brand',
        required: true
    },
},{
    timestamps : true
});
    
const Car = mongoose.model('Car',carSchema);
module.exports = Car;
