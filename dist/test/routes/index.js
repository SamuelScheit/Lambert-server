"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app = express_1.Router();
app.get("/", (req, res) => {
    res.send("HI");
});
exports.default = app;
//# sourceMappingURL=index.js.map