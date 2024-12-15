

const {validationResult} = require('express-validator');

const Course = require('../models/courses.model');

const mongoose = require('mongoose');

const statusText = require('../utils/satusText');

const {asyncWrapper} = require('../middleware/courses.asyncWrapper');

const appError = require('../utils/appError');

// GET All Courses;

const getAllCourse = asyncWrapper(
    async(req, res, next)=>{
        const query = req.query;
        const limit = query.limit || 32;
        const page = query.page || 1;
        const skip = (page -1 ) * limit;
        const courses = await Course.find({}, {"__v": false}).limit(limit).skip(skip);

        return res.status(200).json({status: statusText.SUCCESS, data: {courses: courses}});
    }
);
 // Get Course;
 
const getCourse = asyncWrapper( 
    async(req, res, next) => {
        const id = req.params.courseId;
        if (! mongoose.Types.ObjectId.isValid(id)){
            const error = appError.createErr(statusText.FAIL, 400, "Invalid Course ID");
            return next(error);
        };
        const course = await Course.findById(id, {"__v": false});
        if (!course) {
        const error = appError.createErr(statusText.FAIL, 404,"Course not found");
        return next(error);
        };

        res.status(200).json({status: statusText.SUCCESS, data: {course: course}});
    }
)



// Post Course;


const addCourse = asyncWrapper (
    async(req, res, next)=>{
    
        const err = validationResult(req);   // use to handel errors;
    if (! err.isEmpty()) {
        const error = appError.createErr(statusText.FAIL, 400, err.array());
        return next(error);
    };

    const newCourse = new Course(req.body);

    await newCourse.save();
    return res.status(201).json({status: statusText.SUCCESS, data: {course: newCourse}});
    }
);

// Put Course;

const putCourse = asyncWrapper (
    async (req, res, next)=>{
    
        const error = validationResult(req);
        if(!error.isEmpty()){
        const error = appError.createErr(statusText.FAIL, 400, err.array());
        return next(error);
        };
        const id = req.params.courseId;
        if(!mongoose.Types.ObjectId.isValid(id)){
            const error = appError.createErr(statusText.FAIL, 400, "Invalid Course ID");
            return next(error);
        };
        const course = await Course.findById(id);
        if(!course){
            const error = appError.createErr(statusText.FAIL, 404, "Course not found");
            return next(error)
        }
        const updatedCourse = await Course.findByIdAndUpdate(id, {$set: {...req.body}}, {new: true});

        return res.status(200).json({status: statusText.SUCCESS, data: {course: updatedCourse}});
    }
);

// Patch Course;

const patchCourse = asyncWrapper (
    async (req, res, next) => {
    

        const id = req.params.courseId;

        // Validate the course ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            const error = appError.createErr(statusText.FAIL, 400, "Invalid Course ID");
            return next(error);
        };

        // Check if the course exists
        const course = await Course.findById(id);
        if (!course) {
            const error = appError.createErr(statusText.FAIL, 404, "Course not found");
            return next(error);
        };

        for(let key in req.body){
            if(req.body[key] === "" || req.body[key] === null){
                const error = appError.createErr(statusText.FAIL, 400, `${key} cannot be empty or null`)
                return next(error);
            };
        };
        // Update the course
        const updatedCourse = await Course.findByIdAndUpdate(id, { $set: { ...req.body } }, { new: true });

        return res.status(200).json({status: statusText.SUCCESS, data: {course: updatedCourse}});
    }
);

// Delete Course

const deleteCourse =  asyncWrapper (
    async(req,res, next)=>{

        const id = req.params.courseId;
        await Course.deleteOne({_id: id});
        return res.json({status: statusText.SUCCESS, data: null});

    }
);



module.exports = {
    getAllCourse,
    getCourse,
    addCourse,
    patchCourse,
    putCourse,
    deleteCourse
}
