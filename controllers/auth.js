const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middelware/async');
const User = require('../models/User');
//@desc POST
//@route Post /api/Register
//@access Public
exports.register = asyncHandler(async (req, res, next) => {
    const {
        name,
        email
    } = req.body;
    const user = await User.create({
        name,
        email

    });

    //CREATE token
    const token = user.getSignedJwtToken();

    res.status(200).json({
        success: true,
        token
    });
});


//@desc POST
//@route Post /api/token
//@access Public
exports.token = asyncHandler(async (req, res, next) => {
    const {
        email
    } = req.body;
    if (!email) {
        return next(new ErrorResponse('Please provide an email', 400));
    }

    //check for user
    const user = await User.findOne({
        email
    });

    if (!user) {
        return next(new ErrorResponse('Invalid Credentials', 400));
    }
    const token = user.getSignedJwtToken();

    res.status(200).json({
        success: true,
        token
    });
});