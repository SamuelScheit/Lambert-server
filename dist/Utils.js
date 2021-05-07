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
exports.log = exports.traverseDirectory = void 0;
const promises_1 = __importDefault(require("fs/promises"));
require("missing-native-js-functions");
const DEFAULT_EXCLUDE_DIR = /^\./;
const DEFAULT_FILTER = /^([^\.].*)(?<!\.d)\.(ts|js)$/;
function traverseDirectory(options, action) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!options.filter)
            options.filter = DEFAULT_FILTER;
        if (!options.excludeDirs)
            options.excludeDirs = DEFAULT_EXCLUDE_DIR;
        const routes = yield promises_1.default.readdir(options.dirname);
        const promises = routes
            .sort((a, b) => (a.startsWith("#") ? 1 : -1)) // load #parameter routes last
            .map((file) => __awaiter(this, void 0, void 0, function* () {
            const path = options.dirname + file;
            const stat = yield promises_1.default.lstat(path);
            if (path.match(options.excludeDirs))
                return;
            if (stat.isFile() && path.match(options.filter)) {
                return action(path);
            }
            else if (options.recursive && stat.isDirectory()) {
                return traverseDirectory(Object.assign(Object.assign({}, options), { dirname: path + "/" }), action);
            }
        }));
        const result = yield Promise.all(promises);
        const t = result.flat();
        return t.filter((x) => x != undefined);
    });
}
exports.traverseDirectory = traverseDirectory;
function log(...args) {
    console.log(`[${new Date().toTimeString().split(" ")[0]}]`, ...args);
}
exports.log = log;
//# sourceMappingURL=Utils.js.map