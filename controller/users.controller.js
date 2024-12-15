

const {validationResult} = require('express-validator');

const Course = require('../models/courses.model');

const mongoose = require('mongoose');

const statusText = require('../utils/satusText');

const {asyncWrapper} = require('../middleware/courses.asyncWrapper');

const appError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const generateJWT = require('../utils/generateJWT');

// get all Users;


const getAllUsers = asyncWrapper (
    async(req, res, next)=>{
        // Pagination;
        const query = req.query;
        const limit = query.limit || 32;
        const page = query.page || 1;
        const skip = (page -1 ) * limit;

        const users = await User.find({}, {"__v": false, "password": false, "token": false}).limit(limit).skip(skip);

        return res.status(200).json({status: statusText.SUCCESS, data: {users: users}});
    }
);



// Register;

const register = asyncWrapper (
    async(req, res, next)=>{
        // Get data from request Body;
        const {firstName, lastName, email, password, role} = req.body;

        // Check if the email exist;
        const oldUser = await User.findOne({email: email});
        if(oldUser){

            const error = appError.createErr(statusText.FAIL, 400, `email address ${email} already exist`);
            return next(error);
        }

        //password hashing;
        const hashedPassword = await bcrypt.hash(password, 8);

        //Create new User;
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            avatar: req.file.filename
        });

        //Generate token;

        // const token = await generateJWT({email:newUser.email, id: newUser._id});
        const token = jwt.sign({email: newUser.email, id: newUser._id, role: newUser.role}, "3NM9B4EAMPUWWvgDJTCFCPf3jPKk2TPmZG", {expiresIn: "3m"})
        newUser.token = token;


        await newUser.save();
    
        res.status(201).json({status: statusText.SUCCESS, data: {user: newUser}})
    })


// login;

const login = asyncWrapper (
    async (req, res, next)=>{
        const {email, password} = req.body;

        for(let key in req.body){
            if(req.body[key] === ""){
                const error = appError.createErr(statusText.FAIL, 400, `${key} can not be empty`);
                return next(error);
            }
        }

        const user = await User.findOne({email: email});


        if(!user){
            const error = appError.createErr(statusText.FAIL, 404, "user not found");
            return next(error);
        }

        const matchedPassword = await bcrypt.compare(password, user.password);

        if (user && matchedPassword) {
            // loggedin successfully;
            const token = await generateJWT({email:user.email, id: user._id, role: user.role});
            res.status(200).json({status: statusText.SUCCESS, message: `User logged in successfully!`, data:{token: token}});
        }else{
            const error = appError.createErr(statusText.ERROR, 500, "Your email or password is incorrect!");
            return next(error);
        }
    }
)



module.exports = {
    getAllUsers,
    register,
    login
}
