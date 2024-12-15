
const appError = require("../utils/appError");
const statusText = require('../utils/satusText');

const allowedTo = (...roles)=>{
    return (req, res, next)=>{
        if(! roles.includes(req.currentUser.role)){
            const error = appError.createErr(statusText.FAIL, 401, "this role is not authorized");
            return next(error);
        }
        next();
    }
}

module.exports = allowedTo