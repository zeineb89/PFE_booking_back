const mongoose =require('mongoose');
mongoose.set('useCreateIndex', true)

const Schema = mongoose.Schema;

deviceSchema = new Schema({ 
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    locked: {
        type: Boolean,
        default: true,
        required: true
    }
},{
    timestamps : true
});
    
const Device = mongoose.model('Device',deviceSchema);
module.exports = Device;