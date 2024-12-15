

// const {validationResult} = require('express-validator');

// const Course = require('../models/courses.model');

// const mongoose = require('mongoose');

// const statusText = require('../utils/satusText');


// // GET All Courses;

// const getAllCourse = async(req, res)=>{
//     try {
//         const query = req.query;
//         const limit = query.limit || 10;
//         const page = query.page || 1;
//         const skip = (page -1 ) * limit;
//         const courses = await Course.find({}, {"__v": false}).limit(limit).skip(skip);
//         return res.status(200).json({status: statusText.SUCCESS, data: {courses, courses}});

//     } catch (err) {
//         return res.status(500).json({status: statusText.ERROR, data: null, message: err.message, code: 500});
//     };
// };

//  // Get Course; 
 
// const getCourse = async(req, res) => {
    

//     try {
//         const id = req.params.courseId;
//         const course = await Course.findById(id);
//         if (!course) {
//             return res.status(404).json({status: statusText.FAIL, data: {course: 'Course not found'}});
//         };
    
//         return res.status(200).json({status: statusText.SUCCESS, data: {course: course}});
//     } catch (err) {
//         return res.status(400).json({status: statusText.ERROR, data: null, message: err.message, code: 400});
//     };

// };


// // Post Course;


// const addCourse = async(req, res)=>{
//     try {
//         const err = validationResult(req);   // use to handel errors;
//     if (! err.isEmpty()) {
//         return res.status(400).json({status: statusText.FAIL, data: err.array()});
//     };

//     const newCourse = new Course({
//         title: req.body.title,
//         price: req.body.price
//     });

//     await newCourse.save();
//     return res.status(201).json({status: statusText.SUCCESS, data: {course: newCourse}});

//     } catch (err) {
//         return res.status(500).json({status: statusText.ERROR, data: null, message: err.message, code: 500});
//     }
// };


// // Put Course;

// const putCourse = async (req, res)=>{
//     try {
//         const error = validationResult(req);
//         if(!error.isEmpty()){
//             return res.status(400).json({status: statusText.FAIL, data: error.array()});
//         };
//         const id = req.params.courseId;
//         if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(400).json({status: statusText.FAIL, data: `Invalid Course ID`})
//         };
//         const course = await Course.findById(id);
//         if(!course){
//         return res.status(404).json({status: statusText.FAIL, data: `Course not found`});
//         }
//         const updatedCourse = await Course.findByIdAndUpdate(id, {$set: {...req.body}}, {new: true});

//         return res.status(200).json({status: statusText.SUCCESS, data: {course: updatedCourse}});

//     } catch (err) {
//         return res.status(500).json({status: statusText.ERROR, data: null, message: err.message})
//     }
// }

// // Patch Course;

// const patchCourse = async (req, res) => {
//     try {

//         const id = req.params.courseId;

//         // Validate the course ID
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({status: statusText.FAIL, data: "Invalid Course ID"});
//         };

//         // Check if the course exists
//         const course = await Course.findById(id);
//         if (!course) {
//             return res.status(404).json({status: statusText.FAIL, data: "Course not found"});
//         };

//         for(let key in req.body){
//             if(req.body[key] === "" || req.body[key] === null){
//             return res.status(400).json({status: statusText.FAIL, data: `${key} cannot be empty or null`});
//             };
//         };
//         // Update the course
//         const updatedCourse = await Course.findByIdAndUpdate(id, { $set: { ...req.body } }, { new: true });

//         return res.status(200).json({status: statusText.SUCCESS, data: {course: updatedCourse}});
//     } catch (err) {
//         return res.status(500).json({status: statusText.ERROR, data: null, message: err.message, code: 500});
//     }
// };

// // Delete Course

// const deleteCourse =  async(req,res)=>{

//    try {
//     const id = req.params.courseId;
//     await Course.deleteOne({_id: id});
//     return res.json({status: statusText.SUCCESS, data: null});

//    } catch (err) {
//     return res.status(500).json({error: err.message});
//    }
// };


// module.exports = {
//     getAllCourse,
//     getCourse,
//     addCourse,
//     patchCourse,
//     putCourse,
//     deleteCourse
// }
