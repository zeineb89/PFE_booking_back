const Car =require('../models/cars');
const multer = require('multer');
const crypto = require('crypto');
var path = require('path')
const getAllCars = (req,res,next)=>{
    // Car.Car((err,cars)=>{
    //     if(err){
    //         res.json({error : true, message :err});
    //         return;
    //     }
    //     res.json({success:true, list: cars});
    // });

    Car.find().populate('owner').populate('device').populate('brand').then(cars=>{
        if(cars){
            res.status(200).json(cars)
        }
        else{
            res.status(404).json({error:"qdsdsg"})
        
        }
        
    })
}

const createCar = (req,res,next)=>{
    let car = new Car(req.body);
    console.log(car)
    car.save()
    .then(car => {
        res.json({success:true, car: car});
    })
    .catch(err => {
        res.json({error : true, message :err});
    });
}

const getOneCar = (req,res,next)=>{
    const {id} = req.params
    Car.findById(id,(err,car)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
        res.json({success:true, car: car});
    })
}

const getCarsByOwner = (req,res,next)=>{
    const cars = []
    const ownerId = req.params
    console.log(ownerId)
    Car.find().populate('owner').populate('device').populate('brand').then(allCars=>{
        if(allCars){
           // console.log(cars)
            for(let i=0; i<allCars.length; i++){    
                console.log(allCars[i].owner)
                if(allCars[i].owner._id == ownerId.id){
                    cars.push(allCars[i])
                    console.log('his car')
                    
                }
            }
            res.status(200).json(cars)
        }
        else{
            res.status(404).json({error:"error with cars by owner"})
        }
    })
}

const updateCar = (req,res,next)=>{
    const _id=req.params.id;
    const {body} =req;

    const query = {_id};
    Car.findByIdAndUpdate(query,body,{new: true},(err,car)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
        res.json({success:true, car: car});
    })
}

const deleteCar = (req,res,next)=>{
    const _id=req.params.id
    const query = {_id};
    Car.remove(query, (err,data)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
    });
    res.json({success:true});
}


let lastUploadedImageName = '';
// file upload configuration
const storage = multer.diskStorage({
	destination: './uploads/',
	filename: function (req, file, callback) {
		crypto.pseudoRandomBytes(16, function(err, raw) {
			if (err) return callback(err);
			lastUploadedImageName = raw.toString('hex') + path.extname(file.originalname);
			callback(null, lastUploadedImageName);
		});
	}
});

var upload = multer({storage: storage});

const uploadImage =(upload.single('image'), (req, res)=>{
    //console.log(req.file.filename);
    	console.log('req.file', req.file);
    if (!req.file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
		return res.status(400).json({ msg: 'only image files please'});
	}
	res.status(201).send({ fileName: req.file.filename, file: req.file });
})










module.exports={createCar,getAllCars,getOneCar,updateCar,deleteCar,getCarsByOwner,uploadImage};