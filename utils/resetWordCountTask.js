var cron = require("node-cron");
const User = require("../models/User");

function startResetWordCountTask() {
    cron.schedule("0 0 * * *", () => {
        console.log("Running at midnight");
        User.updateMany({
            wordPerDay: {
                $ne: 0
            }
        }, {
            $set: {
                wordPerDay: 0
            }
        }).then().catch();
    });
}
module.exports = startResetWordCountTask;