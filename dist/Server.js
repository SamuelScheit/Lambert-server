"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const Utils_1 = require("./Utils");
const HTTPError_1 = require("./HTTPError");
require("express-async-errors");
require("missing-native-js-functions");
// Overwrite default options for Router with default value true for mergeParams
const oldRouter = express_1.default.Router;
express_1.default.Router = function (options) {
    if (!options)
        options = {};
    if (options.mergeParams == null)
        options.mergeParams = true;
    return oldRouter(options);
};
class Server {
    constructor(opts) {
        if (!opts)
            opts = {};
        if (!opts.port)
            opts.port = 8080;
        if (!opts.host)
            opts.host = "0.0.0.0";
        if (opts.production == null)
            opts.production = false;
        if (opts.errorHandler == null)
            opts.errorHandler = true;
        this.options = opts;
        this.app = express_1.default();
    }
    errorHandler() {
        this.app.use((error, req, res, next) => {
            let code = 400;
            let message = error === null || error === void 0 ? void 0 : error.toString();
            if (error instanceof HTTPError_1.HTTPError && error.code)
                code = error.code;
            else if (error instanceof TypeError ||
                error instanceof SyntaxError ||
                error instanceof ReferenceError ||
                error instanceof RangeError) {
                console.error(error);
                if (this.options.production) {
                    message = "Internal Server Error";
                }
                code = 500;
            }
            res.status(code).json({ success: false, code: code, error: true, message });
            return next();
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((res) => this.app.listen(this.options.port, () => res()));
            console.log(`[Server] started on ${this.options.host}:${this.options.port}`);
        });
    }
    registerRoutes(root) {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use((req, res, next) => {
                req.server = this;
                next();
            });
            const result = yield Utils_1.traverseDirectory({ dirname: root, recursive: true }, this.registerRoute.bind(this, root));
            if (this.options.errorHandler)
                this.errorHandler();
            return result;
        });
    }
    registerRoute(root, file) {
        var _a, _b;
        if (root.endsWith("/") || root.endsWith("\\"))
            root = root.slice(0, -1); // removes slash at the end of the root dir
        let path = file.replace(root, ""); // remove root from path and
        path = path.split(".").slice(0, -1).join("."); // trancate .js/.ts file extension of path
        path = path.replace("#", ":");
        if (path.endsWith("/index"))
            path = path.slice(0, -6); // delete index from path
        if (!path.length)
            path = "/"; // first root index.js file must have a / path
        try {
            var router = require(file);
            if (router.router)
                router = router.router;
            if (router.default)
                router = router.default;
            if (!router || ((_b = (_a = router === null || router === void 0 ? void 0 : router.prototype) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.name) !== "router")
                throw `File doesn't export any default router`;
            this.app.use(path, router);
            console.log(`[Server] Route ${path} registered`);
            return router;
        }
        catch (error) {
            console.error(new Error(`[Server] Failed to register route ${path}: ${error}`));
        }
    }
    stop() {
        return new Promise((res) => this.http.close(() => res()));
    }
}
exports.Server = Server;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBd0Y7QUFDeEYsbUNBQTRDO0FBRTVDLDJDQUF3QztBQUN4QyxnQ0FBOEI7QUFDOUIsdUNBQXFDO0FBaUJyQywrRUFBK0U7QUFDL0UsTUFBTSxTQUFTLEdBQUcsaUJBQU8sQ0FBQyxNQUFNLENBQUM7QUFDakMsaUJBQU8sQ0FBQyxNQUFNLEdBQUcsVUFBVSxPQUEyQztJQUNyRSxJQUFJLENBQUMsT0FBTztRQUFFLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLENBQUMsV0FBVyxJQUFJLElBQUk7UUFBRSxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUU1RCxPQUFPLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMzQixDQUFDLENBQUM7QUFFRixNQUFhLE1BQU07SUFNbEIsWUFBWSxJQUE2QjtRQUN4QyxJQUFJLENBQUMsSUFBSTtZQUFFLElBQUksR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdEMsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUk7WUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUNyRCxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSTtZQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBRXhELElBQUksQ0FBQyxPQUFPLEdBQWtCLElBQUksQ0FBQztRQUVuQyxJQUFJLENBQUMsR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU8sWUFBWTtRQUNu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