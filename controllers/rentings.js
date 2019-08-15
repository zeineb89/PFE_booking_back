const Renting =require('../models/rentings');

const getAllRentings = (req,res,next)=>{
    Renting.find((err,rentings)=>{
        if(err){
            res.status(500).json({err});
            return;
        }
        res.json(rentings);
    });
}

const createRenting = (req,res,next)=>{
    let renting = new Renting(req.body);
    console.log(renting)
    renting.save()
    .then(renting => {
        res.json({success: true , renting: renting});
    })
    .catch(err => {
        res.send({error : true, message : err});
    });
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

module.exports={createRenting,getAllRentings,getOneRenting,updateRenting,deleteRenting};