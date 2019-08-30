const mongoose =require('mongoose');
mongoose.set('useCreateIndex', true)

const Schema = mongoose.Schema;

rentingSchema = new Schema({ 
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
    inProgress: {
        type: Boolean,
        required: true,
        default: true
    }
},{
    timestamps : true
});
 
const Renting = mongoose.model('Renting',rentingSchema);
module.exports = Renting;