"use strict";
exports.__esModule = true;
// lib/server.ts
var app_1 = require("./app");
var PORT = 5000;
app_1["default"].listen(PORT, function () {
    console.log('Express server listening on port ' + PORT);
});
