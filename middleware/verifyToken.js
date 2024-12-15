const jwt = require('jsonwebtoken');
const statusText = require('../utils/satusText');
const appError = require('../utils/appError');


const verifyToken = (req, res, next)=>{
    const authHeaders = req.headers['Authorization'] || req.headers['authorization'];

    if(!authHeaders){
        const error = appError.createErr(statusText.FAIL, 401, "token is required");
        return next(error);
    }
    // take the token;
    const token = authHeaders.split(' ')[1];

    try {
        const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.currentUser = currentUser;
        return next();
    } catch (err) {
        const error = appError.createErr(statusText.ERROR, 401, "Invalid token" );
        return next(error);
    }

}


module.exports = verifyToken;