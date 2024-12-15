
const port  = 3001;
const express = require('express');
const app = express();
const cors = require('cors');
const statusText = require('./utils/satusText');
require('dotenv').config();


app.use(express.json());// middleware used to handel the json data that sent with the request;

// connect to mongodb;
const mongoose = require('mongoose');

const url = process.env.URL;

mongoose.connect(url).then(()=>{
    console.log("connected with mongodb");
});

// uploads default image from static file exist in the project;

const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// import the Routes;
const coursesRouter = require('./routes/courses.route');

const usersRouter = require('./routes/users.route');

app.use(cors());

// Courses Routers;

app.use('/api/courses', coursesRouter);

// Users Routers;

app.use('/api/users', usersRouter);


// Global meddlware for not found routes; 

app.all('*', (req, res, next) =>{
     return res.status(404).json({status: statusText.FAIL, data: null, message: "this resource is not available", code: 404});
     
});

// Global error handler;

app.use((error, req, res, next)=>{
    res.status(error.statusCode || 500).json({status: error.status || statusText.ERROR, data: null, message: error.message, code: error.statusCode})
});


// SERVER;



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
    
});