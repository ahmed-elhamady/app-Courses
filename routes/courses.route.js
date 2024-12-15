
const express = require('express');

const router = express.Router();

const {validSchema} = require('../middleware/validation');

const coursesController = require('../controller/courses.controller');

const verifyToken = require('../middleware/verifyToken');

const allowedTo = require('../middleware/allowedTo');

const userRoles = require('../utils/userRoles');



router.route('/')
      .get(coursesController.getAllCourse)
      .post(verifyToken, allowedTo(userRoles.MANAGER),validSchema(), coursesController.addCourse)




router.route('/:courseId')
      .get(coursesController.getCourse)
      .patch(validSchema(), coursesController.patchCourse)
      .put(validSchema(), coursesController.putCourse)
      .delete(verifyToken, allowedTo(userRoles.ADMIN, userRoles.MANAGER), coursesController.deleteCourse)



module.exports = router;