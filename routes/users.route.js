
const express = require('express');

const router = express.Router();


const usersController = require('../controller/users.controller');

const verifyToken = require('../middleware/verifyToken');

// upload file (img || pdf || ...etc) from your PC to the profile;

const multer = require('multer');
const appError = require('../utils/appError');


const diskStorage = multer.diskStorage({
      destination: (req, file, cb)=>{   // path
            return cb(null, 'uploads');
      },
      filename: (req, file, cb)=>{    // file name with extention;
            const ext = file.mimetype.split('/')[1];
            const fileName = `user-${Date.now()}.${ext}`;  
            return cb(null, fileName);
      }
});

const fileType = (req, file, cb)=>{
      const type = file.mimetype.split('/')[0];
      if (type === "image"){
            return cb(null, true);
      }else{
            const error = appError.createErr("fail", 400, "file must be an image");
            return cb(error);
      }
}

// upload files;

const upload = multer({
      storage: diskStorage,
      fileFilter: fileType
});




// get all users 
router.route('/')
      .get(verifyToken, usersController.getAllUsers)


// register;

router.route('/register')
      .post(upload.single('avatar'), usersController.register)


// login 

router.route('/login')
      .post(usersController.login)






module.exports = router;