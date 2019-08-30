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
        res.json(device);
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

const getDevicesOwner = (req,res,next)=>{
    const ownerId = req.params
    const devices = []
    console.log(ownerId)
    Device.find().populate('address').populate('owner').then(allDevices=>{
        if(allDevices){
            console.log(allDevices)
            for(let i=0; i<allDevices.length; i++){    
                console.log(allDevices[i].owner)
                if(allDevices[i].owner._id == ownerId.id){
                devices.push(allDevices[i])
                    console.log('his device')
                    
                }
            }
            res.status(200).json(devices)
        }
        else{
            res.status(404).json({error:"qdsdsg"})
        
        }
        
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

module.exports={createDevice,getAllDevices,getOneDevice,getDevicesOwner,updateDevice,deleteDevice,unlockDevice,lockDevice};