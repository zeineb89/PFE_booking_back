const Car =require('../models/cars');
const multer = require('multer');
const crypto = require('crypto');
var path = require('path')
var admin = require("firebase-admin");



var serviceAccount = require("./../../../iotapp-c9343-firebase-adminsdk-xz8tk-ae50a47ca1.json");
// "/home/zeineb-ghdir/project_pfe/iotapp-c9343-firebase-adminsdk-xz8tk-ae50a47ca1.json"
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://iotapp-c9343.firebaseio.com'
  });

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("iotapp-c9343");

const fireData = ()=>{
    console.log("dddddddddddddddddddddddddddddd")

    var usersRef = ref.child("users");
usersRef.set({
  alanisawesome: {
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
  },
  gracehop: {
    date_of_birth: "December 9, 1906",
    full_name: "Grace Hopper"
  }
});

}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });


const getAllCars = (req,res,next)=>{
    Car.find().populate('owner').populate('device').populate('brand').then(cars=>{
        if(cars){
            res.status(200).json(cars)
        }
        else{
            res.status(404).json({error:"qdsdsg"})
        
        }
        
    })
}



const createCar = ((req,res,next)=>{
    console.log("req.body*********************************************")
    console.log(req.body)
    let car = new Car(req.body);

    console.log(car)
    car.save()
    .then(car => {
        res.json({success:true, car: car});
    })
    .catch(err => {
        res.json({error : true, message :err});
    });
})

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
           console.log(allCars)
            for(let i=0; i<allCars.length; i++){    
                console.log(allCars[i])
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


module.exports={createCar,getAllCars,getOneCar,updateCar,deleteCar,getCarsByOwner,fireData};