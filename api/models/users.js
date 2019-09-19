const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

mongoose.set('useCreateIndex', true)
// const Roles = Object.freeze({
//     Admin: 'admin',
//     Owner: 'owner',
//     Client: 'client',
// });

const Genders = Object.freeze({
    Male: 'male',
    Female: 'female'
});

const Schema = mongoose.Schema;
 userSchema = new Schema({ 
    lastName: {
        type: String,
        trim: true,  
        required: true
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    birthDate: {
        type: Date,
        trim: true,
    },
    phone_number: {
        type: Number,
    },
    role: {
        type: String,
        required: true
    },
    gender: {
        type: Genders
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
    },
    valid: {
        type: Boolean,
        default: false
    },
    driverLicence: {
        type: String
    },
    cin: {
        type: String
    },
    address:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Address',
    }
},{
    timestamps : true
});

// hash user password before saving into database
userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
    });

const User = mongoose.model('User',userSchema);
module.exports = User;