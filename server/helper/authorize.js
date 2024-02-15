const jwt = require('jsonwebtoken')

async function authorize(req,res,next){
    try{
        console.log("inside")
        console.log(req.headers)
        if(!req.headers.authorization || !req.headers.authorization.startsWith("bearer")){
            res.statusCode = 401
            throw new Error("User is not authorized")
        }
        const token = req.headers.authorization.split(' ')[1]
        const {payload} = await jwt.verify(token,process.env.NODE_SECRET_KEY,{complete:true})
        req.user = payload
        next()
    }catch(err){
        res.statusCode = 401
        next(err)
    }
}

module.exports = authorize