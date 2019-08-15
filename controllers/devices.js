const Device =require('../models/devices');

const getAllDevices = (req,res,next)=>{
    Device.find((err,devices)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
        res.json({success:true, list: devices});
    });
}

const createDevice = (req,res,next)=>{
    let device = new Device(req.body);
    console.log(device)
    device.save()
    .then(device => {
        res.json({success:true, device: device});
    })
    .catch(err => {
        res.json({error : true, message :err});
    });
}

const getOneDevice = (req,res,next)=>{
    const {id} = req.params
    Device.findById(id,(err,device)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
        res.json({success:true, device: device});
    })
}

const updateDevice = (req,res,next)=>{
    const _id=req.params.id;
    const {body} =req;

    const query = {_id};
    Device.findByIdAndUpdate(query,body,{new: true},(err,device)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
        res.json({success:true, device: device});
    })
}

const deleteDevice = (req,res,next)=>{
    const _id=req.params.id
    const query = {_id};
    Device.remove(query, (err,data)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
    });
    res.json({success:true});
}


const unlockDevice = (req,res,next) =>{      
    Device.findByIdAndUpdate({locked : false},body,{new: true},(err,device)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
        res.json({success:true, device: device});
    })
}

const lockDevice = (req,res,next) =>{
        
    Device.findByIdAndUpdate({locked : true},body,{new: true},(err,device)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
        res.json({success:true, device: device});
    })
}

module.exports={createDevice,getAllDevices,getOneDevice,updateDevice,deleteDevice,unlockDevice,lockDevice};