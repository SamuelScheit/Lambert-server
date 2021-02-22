"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const check_1 = require("../../check");
const app = express_1.Router();
app.get("/", (req, res) => {
    res.send("HI");
});
app.post("/", check_1.check({ name: String }), (req, res) => {
    res.send(`Hi ${req.body.name}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map