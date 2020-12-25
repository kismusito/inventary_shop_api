const app = require("./app");
require("dotenv").config();
require("./database");

async function init() {
    await app.listen(process.env.PORT || 4000);
    console.log("App running on port: ", process.env.PORT || 4000);
}

init();

module.exports = app;
