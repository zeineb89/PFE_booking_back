const Brand =require('../models/brands');

const getAllBrands = (req,res,next)=>{
    Brand.find((err,Brands)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
        res.json({success:true, list: brands});
    });
}

const createBrand = (req,res,next)=>{
    let brand = new Brand(req.body);
    console.log(brand)
    brand.save()
    .then(brand => {
        res.json({success:true, brand: brand});
    })
    .catch(err => {
        res.json({error : true, message :err});
    });
}

const getOneBrand = (req,res,next)=>{
    const {id} = req.params
    Brand.findById(id,(err,brand)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
        res.json({success:true, brand: brand});
    })
}

const updateBrand = (req,res,next)=>{
    const _id=req.params.id;
    const {body} =req;

    const query = {_id};
    Brand.findByIdAndUpdate(query,body,{new: true},(err,brand)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
        res.json({success:true, brand: brand});
    })
}

const deleteBrand = (req,res,next)=>{
    const _id=req.params.id
    const query = {_id};
    Brand.remove(query, (err,data)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
    });
    res.json({success:true});
}

module.exports={createBrand,getAllBrands,getOneBrand,updateBrand,deleteBrand};