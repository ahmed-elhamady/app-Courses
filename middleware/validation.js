

const {body} = require('express-validator');

const validSchema = ()=>{
    return [
        body('title')
             .notEmpty()
             .withMessage("title is required")
             .isLength({min: 2})
             .withMessage("title at least 2 char"),
        body('price')
             .notEmpty()
             .withMessage("price is required")
             .isLength({min: 3})
             .withMessage("price at least 2 digits")
    ]
};

module.exports = {
    validSchema
}