const authModel = require('../Model/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async(req, res) => {
    try{
        const {Email, Password, Name, PhoneNumber, Age} = req.body;

        const register = await authModel.findOne({Email});
        if(register) return res.status(400).json({message:"User Already Exists"});

        const hashedPassword = await bcrypt.hash(Password, 10);
        const createUser = await authModel.create({Email, Password:hashedPassword, Name, PhoneNumber, Age});
        const token = jwt.sign({id: createUser._id}, process.env.JWT_SECRET, {expiresIn :'1h'});

        res.status(200).json({message:"User Requistered Successfully", token})
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

const loginUser = async(req,res)=>{
    try{
        const {Email, Password} = req.body;

        const user = await authModel.findOne({Email});
        if(!user) return res.status(400).json({message:"Email Incorrect"});

        const isMatch = await bcrypt.compare(Password, user.Password);
        if(!isMatch) return res.status(404).json({message:"Password Not Match"});

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn : '1h'});

        res.status(200).json({message:"User Logined Successfully", token});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports = {registerUser, loginUser};


