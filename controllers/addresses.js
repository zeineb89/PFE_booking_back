const Address =require('../models/addresses');

const getAllAddresss = (req,res,next)=>{
    Address.find((err,addresses)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
        res.json({success:true, list:addresses});
    });
}

const createAddress = (req,res,next)=>{
    let address = new Address(req.body);
    console.log(address)
    address.save()
    .then(address => {
        res.json({success:true, address:address});
    })
    .catch(err => {
        res.json({error : true, message :err});
    });
}

const getOneAddress = (req,res,next)=>{
    const {id} = req.params
    Address.findById(id,(err,address)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
        res.json({success:true, address:address});
    })
}

const updateAddress = (req,res,next)=>{
    const _id=req.params.id;
    const {body} =req;

    const query = {_id};
    Address.findByIdAndUpdate(query,body,{new: true},(err,address)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
        res.json({success:true, address:address});

    })
}

const deleteAddress = (req,res,next)=>{
    const _id=req.params.id
    const query = {_id};
    Address.remove(query, (err,data)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
    });
    res.json({success:true});
}

module.exports={createAddress,getAllAddresss,getOneAddress,updateAddress,deleteAddress};