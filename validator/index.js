const { check, validationResult} = require('express-validator');
exports.userSignupValidator = [
    // check('name', 'Name is required').notEmpty(),
    // check('email', 'Email must be between 3 and 32 characters')
    //     .matches(/.+\@.+\..+/)
    //     .withMessagge('Enter a valid Email')
    //     .isLength({
    //         min: 4,
    //         max: 32
    //     }),
    // check('password', 'Password is required').notEmpty(),
    // check('password')
    //     .isLength({ min: 6 })
    //     .withMessagge('Password must contain at least 6 characters')
    //     .matches(/\d/)
    //     .withMessagge('Password must contain a number')
    check('name')
    .notEmpty()
    .withMessage('Name is required'),
    check('email')
    .isEmail()
    .withMessage('Valid email is required'),
    check('password')
    .isLength({min:6})
    .withMessage('Password must be at least 6 character long')

    // const erros = req.validationErrors()
    // if (errors) {
    //     const firstError = errors.map(error => error.message)[0];
    //     return res.json(400).json({ err: firstError });
    // }
    // next();
]
exports.isRequestValidated= (req,res,next) =>{
    const errors= validationResult(req);
    if (errors.array().length >0) {
        return res.status(400).json({ error: errors.array()[0].msg})
    }
    next();
 }