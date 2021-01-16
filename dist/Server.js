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
const body_parser_1 = __importDefault(require("body-parser"));
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
        if (opts.jsonBody == null)
            opts.jsonBody = true;
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
            let _time_ = new Date();
            let hours = _time_.getHours().toString();
            let minutes = _time_.getMinutes().toString();
            let seconds = _time_.getSeconds().toString();
            hours = hours.length < 2 ? "0" + hours : hours;
            minutes = minutes.length < 2 ? "0" + minutes : minutes;
            seconds = seconds.length < 2 ? "0" + seconds : seconds;
            console.log(`[Server][${hours}:${minutes}:${seconds}] started on ${this.options.host}:${this.options.port}`);
        });
    }
    registerRoutes(root) {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.use((req, res, next) => {
                req.server = this;
                next();
            });
            if (this.options.jsonBody)
                this.app.use(body_parser_1.default.json());
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
            let _time_ = new Date();
            let hours = _time_.getHours().toString();
            let minutes = _time_.getMinutes().toString();
            let seconds = _time_.getSeconds().toString();
            hours = hours.length < 2 ? "0" + hours : hours;
            minutes = minutes.length < 2 ? "0" + minutes : minutes;
            seconds = seconds.length < 2 ? "0" + seconds : seconds;
            console.log(`[Server][${hours}:${minutes}:${seconds}] Route ${path} registered`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBd0Y7QUFDeEYsbUNBQTRDO0FBRTVDLDJDQUF3QztBQUN4QyxnQ0FBOEI7QUFDOUIsdUNBQXFDO0FBQ3JDLDhEQUFxQztBQWtCckMsK0VBQStFO0FBQy9FLE1BQU0sU0FBUyxHQUFHLGlCQUFPLENBQUMsTUFBTSxDQUFDO0FBQ2pDLGlCQUFPLENBQUMsTUFBTSxHQUFHLFVBQVUsT0FBMkM7SUFDckUsSUFBSSxDQUFDLE9BQU87UUFBRSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxDQUFDLFdBQVcsSUFBSSxJQUFJO1FBQUUsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFFNUQsT0FBTyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0IsQ0FBQyxDQUFDO0FBRUYsTUFBYSxNQUFNO0lBTWxCLFlBQVksSUFBNkI7UUFDeEMsSUFBSSxDQUFDLElBQUk7WUFBRSxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTtZQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3RDLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJO1lBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDckQsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUk7WUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN4RCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSTtZQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBRWhELElBQUksQ0FBQyxPQUFP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