"use strict";
exports.__esModule = true;
// lib/app.ts
var express = require("express");
var bodyParser = require("body-parser");
var crmRoutes_1 = require("./routes/crmRoutes");
var App = /** @class */ (function () {
    function App() {
        this.routePrv = new crmRoutes_1.Routes();
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
    }
    App.prototype.config = function () {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    };
    return App;
}());
exports["default"] = new App().app;
