const jwt = require('jsonwebtoken');

const protect = (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(404).json({message:"No token found"});
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode;
        next();
    }
    catch(error){
        res.status(401).json({message:"Invalid Token"});
    }
}

module.exports = protect;