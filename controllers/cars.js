const Car =require('../models/cars');

const getAllCars = (req,res,next)=>{
    Car.find((err,cars)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
        res.json({success:true, list: cars});
    });
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

module.exports={createCar,getAllCars,getOneCar,updateCar,deleteCar};