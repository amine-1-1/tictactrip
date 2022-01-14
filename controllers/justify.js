const asyncHandler = require("../middelware/async");
const User = require("../models/User");
const justifyText = require("../services/justifyText");
// @desc Return justified Text
// @route POST /api/justify
// @access Restricted (must have valid token)
exports.justify = asyncHandler(async (req, res, next) => {
    let justifiedText = justifyText(req.body, 80);
    await User.updateOne({
        email: req.user.email
    }, {
        $set: {
            wordPerDay: req.user.wordPerDay + req.user.textWordCount
        }
    });
    res
        .status(200)
        .json({
            message: "This is the justified text",
            data: justifiedText
        });
});