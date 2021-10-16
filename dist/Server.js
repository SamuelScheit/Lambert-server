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
const helmet_1 = __importDefault(require("helmet"));
const chalk_1 = __importDefault(require("chalk"));
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
        this.errorHandler = (error, req, res, next) => {
            try {
                let code;
                let message = error === null || error === void 0 ? void 0 : error.toString();
                if (error instanceof HTTPError_1.HTTPError && error.code)
                    code = error.code || 400;
                else {
                    console.error(error);
                    if (this.options.production) {
                        message = "Internal Server Error";
                    }
                    code = 500;
                }
                res.status(code).json({ success: false, code: code, error: true, message });
            }
            catch (e) {
                console.error(e);
                return res.status(500).json({ success: false, code: 500, error: true, message: "Internal Server Error" });
            }
        };
        if (!opts)
            opts = {};
        if (!opts.port)
            opts.port = 8080;
        if (!opts.host)
            opts.host = "0.0.0.0";
        if (opts.production == null)
            opts.production = false;
        if (opts.serverInitLogging == null)
            opts.serverInitLogging = true;
        if (opts.errorHandler == null)
            opts.errorHandler = this.errorHandler;
        if (opts.jsonBody == null)
            opts.jsonBody = true;
        if (opts.server)
            this.http = opts.server;
        this.options = opts;
        if (opts.app)
            this.app = opts.app;
        else
            this.app = (0, express_1.default)();
    }
    secureExpress() {
        this.app.use(helmet_1.default.contentSecurityPolicy());
        this.app.use(helmet_1.default.expectCt);
        this.app.use(helmet_1.default.originAgentCluster());
        this.app.use(helmet_1.default.referrerPolicy({ policy: "same-origin" }));
        this.app.use(helmet_1.default.hidePoweredBy());
        this.app.use(helmet_1.default.noSniff());
        this.app.use(helmet_1.default.dnsPrefetchControl({ allow: true }));
        this.app.use(helmet_1.default.ieNoOpen());
        this.app.use(helmet_1.default.frameguard({ action: "deny" }));
        this.app.use(helmet_1.default.permittedCrossDomainPolicies({ permittedPolicies: "none" }));
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const server = this.http || this.app;
            if (!server.listening) {
                yield new Promise((res) => {
                    this.http = server.listen(this.options.port, () => res());
                });
                if (this.options.serverInitLogging)
                    this.log("info", `[Server] started on ${this.options.host}:${this.options.port}`);
            }
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
            const result = yield (0, Utils_1.traverseDirectory)({ dirname: root, recursive: true }, this.registerRoute.bind(this, root));
            if (this.options.errorHandler)
                this.app.use(this.options.errorHandler);
            if (this.options.production)
                this.secureExpress();
            return result;
        });
    }
    log(l, ...args) {
        // @ts-ignore
        if (!console[l])
            l = "verbose";
        const level = l === "verbose" ? "log" : l;
        var color;
        switch (level) {
            case "error":
                color = "red";
                break;
            case "warn":
                color = "yellow";
                break;
            case "info":
                color = "blue";
            case "log":
            default:
                color = "reset";
        }
        if (this.options.production && l === "verbose")
            return;
        console[level](chalk_1.default[color](`[${new Date().toTimeString().split(" ")[0]}]`), ...args);
    }
    registerRoute(root, file) {
        var _a, _b;
        if (root.endsWith("/") || root.endsWith("\\"))
            root = root.slice(0, -1); // removes slash at the end of the root dir
        let path = file.replace(root, ""); // remove root from path and
        path = path.split(".").slice(0, -1).join("."); // trancate .js/.ts file extension of path
        path = path.replaceAll("#", ":").replaceAll("!", "?").replaceAll("\\", "/");
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
            if (this.options.errorHandler)
                router.use(this.options.errorHandler);
            this.app.use(path, router);
            if (this.options.serverInitLogging)
                this.log("verbose", `[Server] Route ${path} registered`);
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
//# sourceMappingURL=Server.js.map