const User =require('../models/users');

const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

const getAllUsers = (req,res,next)=>{
    User.find((err,users)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
        res.json({success: true, list: users});
    });
}

const getAllOwners = (req,res,next)=>{
    let owners = []
    console.log("jjjjjjjjjjjjjjjjjjjj")
    
    User.find((err,users)=>{
        if(err){
            console.log("jjjjjjjjjjjjjjjjjjjj")
            res.json({error : true, message :err});
            return;
        }
        users.forEach(element => {
            if(element.role === "owner")
                owners.push(element)
        });
        console.log(owners)
        res.json(owners);
    });   
}

const getAllClients = (req,res,next)=>{
    let clients = []
    console.log("jjjjjjjjjjjjjjjjjjjj")
    
    User.find((err,users)=>{
        if(err){
            console.log("jjjjjjjjjjjjjjjjjjjj")
            res.json({error : true, message :err});
            return;
        }
        users.forEach(element => {
            if(element.role === "client")
                clients.push(element)
        });
        console.log(clients)
        res.json(clients);
    });   
}

const createUser = (req,res,next)=>{
    let user = new User(req.body);
    user.save()
    .then(user => {
        res.json({success:true, user:user});
    })
    .catch(err => {
        res.json({error : true, message :err});
    });
}


const authenticate = (req, res, next) => {
    console.log('req.body.email')
    console.log(req.body.email)
    console.log(req.body.password)
    User.findOne({email:req.body.email}, function(err, userInfo){
        if (err) {
            res.json({status:"error", message: err});
            return;
        } else {
            console.log('userInfo')
            console.log(userInfo)
            if(userInfo){
                if(bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({id: userInfo._id, role: userInfo.role}, 
                        "secret_this_should_be_longer");
                        res.json({
                            status:"success", 
                            message: "user found!!!", 
                            data:{user: userInfo, token:token}
                        });
                }
                else {
                    res.json({status:"error", message: "Invalid email/password!!!", data:null});
                }
            }
            else res.json({status:"error", message: "user not found!!!", data:null});
                
            
        }
    });
}



// const getOneUser = (req,res,next)=>{
//     const {id} = req.params
//     User.findById(id,(err,user)=>{
//         if(err){
//             res.json({error : true, message :err});
//             return;
//         }
        
//         res.json({success:true, user:user});
//     })
// }

const getOneUser = (req,res,next)=>{
    const {id} = req.params
    User.findById(id).populate('address').then(user=>{
        if(user){
            res.status(200).json(user)
        }
        else{
            res.status(404).json({error:"jhgjj"})
        
        }
        
    })
}


const getUserByEmail = (req,res,next)=>{
    // const {id} = req.params
    let email = req.params
    console.log(email)

    User.find(email,(err,user)=>{
        if(err){
            res.json({error:true, message :err});
            return;
        }
        console.log('user by email')
        console.log(user)
        res.json({success:true, user:user});
    })
}

const updateUser = (req,res,next)=>{
    const _id=req.params.id;
    const {body} =req;
    const query = {_id};
    User.findByIdAndUpdate(query,body,{new: true},(err,user)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
        res.json({success:true, user:user});
    })
}

const deleteUser = (req,res,next)=>{
    const _id=req.params.id
    const query = {_id};
    User.remove(query, (err,data)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
    });
    res.json({success:true});
}

const validateClient = (req,res,next)=>{
    const _id=req.params.id;
    const query = {_id};
    User.findByIdAndUpdate(query,{valid: req.body.event},{new: true},(err,user)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
        res.json({success:true, user:user});
    })
}


module.exports={createUser,getAllUsers,getAllOwners, getAllClients,getOneUser,getUserByEmail,updateUser,deleteUser,validateClient,authenticate};