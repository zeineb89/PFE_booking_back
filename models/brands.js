const mongoose =require('mongoose');
mongoose.set('useCreateIndex', true)

const Schema = mongoose.Schema;

const Types = Object.freeze({
    Citadines: 'citadines',
    MicroCitadines: 'microCitadines',
});

brandSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    type: {
        type: Types,
        required: true
    }
},{
    timestamps : true
});

const Brand = mongoose.model('Brand',brandSchema);
module.exports = Brand;
