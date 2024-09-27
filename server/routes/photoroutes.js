const router = require("express");
const multer = require("multer")
const photoModel = require('../models/photomodel')
const authorize = require('../helper/authorize');
const { default: mongoose } = require("mongoose");
const userModel = require("../models/usermodel");


const photoRouter = router()

const storage = multer.memoryStorage({   
    destination: function(req, file, cb) { 
    cb(null, './uploads');    
  }, 
  filename: function (req, file, cb) { 
     cb(null , file.originalname);   
  }
});

const upload = multer({ storage: storage });



photoRouter.get('/getAllPhotos',authorize,async(req,res,next)=>{
    try{
        const user = await userModel.findById(req.user.id)
        if(!user){
            req.statusCode = 44
            throw new Error("user doesn't exist")
        }
        const {photos} = await user.populate('photos')
        return res.json({photos:photos})
    }catch(err){
        next(err)
    }
})

photoRouter.post('/upload',authorize,upload.single("files"),async (req,res,next)=>{
    try{
        console.log(req.file)
        const timeStamp = new Date()
        const {tags} = req.body
        const id = req.file.originalname+timeStamp.getTime()
        const file = req.file
        const photo = await photoModel.create({
            originalName:file.originalname,
            fileData:file.buffer,
            tags:[],
            name:id
        })
       const user = await userModel.findByIdAndUpdate(req.user.id,{$push: { photos: photo._id } },{new:true})
        const {photos} = await user.populate('photos')
        console.log(photos)
        return res.json({success:true,photos:photos})

    }catch(err){
        next(err)
    }
})

photoRouter.post("/updatePhoto",(req,res,next)=>{
    try{

    }catch(err){
        next(err)
    }
})

photoRouter.post("/deletePhoto/:id",(req,res,next)=>{
    try{

    }catch(err){
        next(err)
    }
})

photoRouter.get('/:id',(req,res,next)=>{

})

photoRouter.post('/share/:id',(req,res,next)=>{
    
})

photoRouter.post('/deleteConnection/:id',(req,res,next)=>{

})

photoRouter.post('/editPhoto/:id',(req,res,next)=>{
    
})

module.exports = photoRouter