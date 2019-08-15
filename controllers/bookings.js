const Booking =require('../models/bookings');

const getAllBookings = (req,res,next)=>{
    Booking.find((err,bookings)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
        res.json({success : true, bookings :bookings});
    });
}

const createBooking = (req,res,next)=>{
    let booking = new Booking(req.body)
    booking.save()
    .then(booking => {
        res.json({success : true, booking :booking});
    })
    .catch(err => {
        res.send({error : true, message :err});
    });
}

const getOneBooking = (req,res,next)=>{
    const {id} = req.params
    Booking.findById(id,(err,booking)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
        res.json({success : true, booking :booking});
    })
}

const updateBooking = (req,res,next)=>{
    const _id=req.params.id;
    const {body} =req;

    const query = {_id};
    Booking.findByIdAndUpdate(query,body,{new: true},(err,booking)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
        res.json({success : true, booking :booking});
    })
}

const deleteBooking = (req,res,next)=>{
    const _id=req.params.id
    const query = {_id};
    Booking.remove(query, (err,data)=>{
        if(err){
            res.json({error : true, message :err});
            return;
        }
    });
    res.json({success:true});
}

module.exports={createBooking,getAllBookings,getOneBooking,updateBooking,deleteBooking};