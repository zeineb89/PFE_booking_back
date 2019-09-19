const Renting =require('../models/rentings');
const Car =require('../models/cars');
const carController = require('./cars')

const getAllRentings = (req,res,next)=>{
    
    Renting.find().populate('client').populate({
        path: 'car',
        populate: { path: 'owner' },
        populate: { path: 'brand' },

    }).then(rentings=>{
        if(rentings){
            res.status(200).json(rentings)
        } else{
            res.status(404).json({error:"error with rentings list"})
        }
    });
}

const getRentingsByOwner = (req,res,next)=>{
    const rentings = []
    const ownerId = req.params
    console.log(ownerId)
    Renting.find().populate('client').populate({
        path: 'car',
        populate: { path: 'owner' },
        populate: { path: 'brand' },

    }).then(allRentings=>{
        if(allRentings){
            // console.log(allRentings)
            for(let i=0; i<allRentings.length; i++){    
                console.log(allRentings[i].car)
                if(allRentings[i].car.owner == ownerId.id){
                    rentings.push(allRentings[i])
                    console.log('his renting')
                }
            }
            res.status(200).json(rentings)
        }
        else{
            res.status(404).json({error:"error with rentings list"})
        
        }
        
    })
    // Renting.find((err,rentings)=>{
    //     if(err){
    //         res.status(500).json({err});
    //         return;
    //     }
    //     res.json(rentings);
    // });
}

const createRenting = (req,res,next)=>{
    // console.log(req)
    console.log(req.body)

    let carId = req.body.car
    
    console.log(carId)

    Car.findById(carId,(err,car)=>{
        if(err){
            res.json({error : true, message :'Car not found !'});
            return;
        }
        else{
            if(!car.available){
                res.json({error : true, message :'Car not available !'});
                return;
            }else if(car.available){
                const _id=req.params.id;
                const {body} =req;

                const query = {_id};
                Car.findByIdAndUpdate(carId,{available:false},{new: true},(err,car)=>{
                    if(err){
                        res.json({error : true, message :err});
                        return;
                    }
                    let renting = new Renting(req.body);
                    // let objRetour = {
                    //     carId: req.body.car._id,
                    //     deviceId: req.body.car.device._id,
                    //     position :req.body.car.address,
                    //     client : req.body.client._id,
                    //     inProgress: true
                    // }
                    console.log(renting)
                    renting.save()
                    .then(renting => {

                        res.json({success: true , renting: renting});
                    })
                    .catch(err => {
                        res.send({error : true, message : err});
                    });
                })
            }
        }
    })
}

const getOneRenting = (req,res,next)=>{
    const {id} = req.params
    Renting.findById(id,(err,renting)=>{
        if(err){
            res.json({error : true, message : err});
            return;
        }
        res.json({success: true , renting:renting});
    })
}

const updateRenting = (req,res,next)=>{
    const _id=req.params.id;
    const {body} =req;

    const query = {_id};
    Renting.findByIdAndUpdate(query,body,{new: true},(err,renting)=>{
        if(err){
            res.json({error : true, message : err});
            return;
        }
        res.json({ success: true, renting : renting});
    })
}

const deleteRenting = (req,res,next)=>{
    const _id=req.params.id
    const query = {_id};
    Renting.remove(query, (err,data)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
    });
    res.json({success:true});
}


const endRenting = (req,res,next)=>{
    const _id=req.params.id

    Renting.findByIdAndUpdate(_id,{inProgress:false},{new: true},(err,renting)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
        console.log(renting)
        Car.findById(renting.car,{available:true},{new: true},(err,car)=> {
            if(err){
                res.json({error : true, message :err});
                return;
            }
            console.log(car)
            res.json({success:true});
        })
        
    });
    
}
module.exports={createRenting,getRentingsByOwner,getAllRentings,getOneRenting,updateRenting,deleteRenting,endRenting};