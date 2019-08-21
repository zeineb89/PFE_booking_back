const Car =require('../models/cars');

const getAllCars = (req,res,next)=>{
    // Car.Car((err,cars)=>{
    //     if(err){
    //         res.json({error : true, message :err});
    //         return;
    //     }
    //     res.json({success:true, list: cars});
    // });

    Car.find().populate('address').populate('owner').populate('device').populate('brand').then(cars=>{
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
    // Car.find(id,(err,car)=>{
    //     if(err){
    //         res.json({error : true, message :err});
    //         return;
    //     }
    //     res.json({success:true, car: car});
    // })
    Car.find().then(allCars=>{
        if(allCars){
           // console.log(cars)
            for(let i=0; i<allCars.length; i++){    
                console.log(allCars[i].owner)
                if(allCars[i].owner == ownerId.id){
                    cars.push(allCars[i])
                    console.log('his car')
                    
                }
            }
            res.status(200).json(cars)
        }
        else{
            res.status(404).json({error:"qdsdsg"})
        
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

module.exports={createCar,getAllCars,getOneCar,updateCar,deleteCar,getCarsByOwner};