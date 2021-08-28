"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const check_1 = require("../../../../check");
const app = (0, express_1.Router)();
app.get("/", (req, res) => {
    console.log(req.params);
    res.send("USER");
});
app.post("/", (0, check_1.check)({ test: String, $name: String }), (req, res) => {
    console.log(req.body);
    res.send("OK");
});
exports.default = app;
//# sourceMappingURL=index.js.map