const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("./async");
const jwt = require("jsonwebtoken");
// Authorize only requests with valid token
exports.checkWordCount = asyncHandler(async (req, res, next) => {
    let textWordCount = req.body.split(" ").length;
    if (req.user.wordPerDay + textWordCount > 80000) {
        return next(new ErrorResponse("Reached Word Count Limit per day", 402));
    }
    req.user.textWordCount = textWordCount;
    next();
});