"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app = express_1.Router();
app.get("/", (req, res) => {
    console.log(req.params);
    res.send("USERNAME");
});
exports.default = app;
//# sourceMappingURL=index.js.map