
// const express = require('express');
// const app = express();
// const port = 3001;

// let courses = [
//     {
//         id: 1,
//         title: "JS course",
//         price: 1000,
//     },
//     {
//         id: 2,
//         title: "React js course",
//         price: 1500,
//     },
//     {
//         id: 3,
//         title: "Node js course",
//         price: 2000,
//     },
//     {
//         id: 4,
//         title: "Java course",
//         price: 3000
//     },
// ];

// const {body, validationResult} = require('express-validator');

// app.use(express.json());  // middleware used to handel the json data that sent with the request;




// // CRUD => (Create, Read, Update, Delete);



// //GET ALL;

// app.get('/api/courses', (req, res)=>{

//     res.status(200).json(courses);
// })



// // GIT COURSE BY ID;

// app.get('/api/courses/:courseId', (req, res) => {
//     const courseId = parseInt(req.params.courseId, 10);

//     if (isNaN(courseId)) {
//         return res.status(400).json({ error: 'Invalid course ID' });
//     }

//     // verify that course.id == courseId that send with request and if there are equals will return the Id value;
//     const course = courses.find(function(course){
//         return course.id === courseId;
//     });

//     if (!course) {
//         return res.status(404).json({ error: 'Course not found' });
//     };

//     res.status(200).json(course);
// });



// // POST;





// // app.post('/api/courses', (req, res)=>{
// //     const pushCourse = courses.push({id: courses.length +1, ... req.body});
// //     const newCourse = courses.find((course)=>{
// //         return course.id === pushCourse;
// //     });


// //     res.status(201).json(newCourse);
// // })






// // app.post('/api/courses', (req, res) => {

// //     // Input validation
// //     if (!req.body.title || req.body.title == null) {
// //         return res.status(400).json({ error: 'Invalid title course' });
// //     }
// //     if (!(req.body.price) || req.body.price == null) {
// //         return res.status(400).json({ error: 'Invalid price course' });
// //     }

// //     const newCourse = { id: courses.length + 1, ...req.body };
// //     courses.push(newCourse);

// //     res.status(201).json(newCourse);
// // });



// app.post('/api/courses', 
//     [
//         body('title')
//              .notEmpty()
//              .withMessage("title is required")
//              .isLength({min: 2})
//              .withMessage("title at least 2 char"),
//         body('price')
//              .notEmpty()
//              .withMessage("price is required")
//     ]
//     ,(req, res)=>{
//         const err = validationResult(req);   // use to handel errors;
//         if (! err.isEmpty()) {
//             return res.status(400).json(err.array());
//         }
//     const newCourse = {id: courses.length +1, ... req.body};
//     courses.push(newCourse);
//     res.status(201).json(newCourse);
// });



// // PATCH;

// app.patch('/api/courses/:courseId', (req, res)=>{
//     const courseId = parseInt(req.params.courseId);
//     if(isNaN(courseId)){
//         return res.status(400).json({error: "Invalid course ID"});
//     }
//     let course = courses.find(function(course) {
//         return course.id === courseId;
//     });
//     if (! course) {
//         return res.status(404).json({error: "Course not found"});
//     };
//     course = {... course, ...req.body};
//     res.status(200).json(course);
// });

// // PUT 
// app.put('/api/courses/:courseId', (req, res)=>{
//     const courseId = parseInt(req.params.courseId);
//     if(isNaN(courseId)){
//         return res.status(400).json({error: "Invalid course ID"});
//     }
//     let course = courses.find(function(course) {
//         return course.id === courseId;
//     });
//     if (! course) {
//         return res.status(404).json({error: "Course not found"});
//     };
//     course = {... course, ...req.body}; // override
//     res.status(200).json(course);
// });



// // DELETE

// app.delete('/api/courses/:courseId', (req,res)=>{

//     const courseId = parseInt(req.body.courseId);
//     courses = courses.filter(function(course){
//         return course.id !== courseId;
//     });
//     res.status(200).json({success: true});
// });








// // SERVER;
// app.listen(port, ()=>{
//     console.log(`listening on port ${port}`);
    
// });