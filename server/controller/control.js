var Userdb=require('../model/model')

//create and save new user

exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

//retrive and returrn all user/retrive and return a single user
exports.find=(req,res)=>{

if(req.query.id){
    const id=req.query.id;

    Userdb.findById(id)
    .then(data=>{
        if(!data){
            res.status(404).send({mesaage:"not found user with id"+id})
        }
        else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"error retriving user with id"+id
        })
    })

}else{Userdb.find()
    .then(user=>{
        res.send(user)
    })
.catch(err=>{
    res.status(500).send({message:err.message||"error occured while retriving request"})
})}

    





  
}

//update anew identifed user by userid
exports.update=(req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"data to updata can not empty"})
    }
    const id=req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({
                message:`cannot update with ${id}.maybe user not found`
            })
               
            
        }else( res.send(data))
    })
.catch(err=>{
    res.status(500).send({message:"error update user information"})
})
}

//delete a user with specifed user id in the request

exports.delete=(req,res)=>{
    const id=req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`cannot Delete with id ${id}.may be id is wrong`})
        }else{
            res.send({
                message:"User was deleted successfully"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"could not delete user with id="+id
        });
    });

}
