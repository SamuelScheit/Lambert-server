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
const DEFAULT_FILTER = /^([^\.].*)\.js$/;
function traverseDirectory(options, action) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!options.filter)
            options.filter = DEFAULT_FILTER;
        if (!options.excludeDirs)
            options.excludeDirs = DEFAULT_EXCLUDE_DIR;
        const routes = yield promises_1.default.readdir(options.dirname);
        const promises = routes.map((file) => __awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQTZCO0FBQzdCLHVDQUFxQztBQVNyQyxNQUFNLG1CQUFtQixHQUFHLEtBQUssQ0FBQztBQUNsQyxNQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQztBQUV6QyxTQUFzQixpQkFBaUIsQ0FDdEMsT0FBaUMsRUFDakMsTUFBMkI7O1FBRTNCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUFFLE9BQU8sQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDO1FBQ3JELElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVztZQUFFLE9BQU8sQ0FBQyxXQUFXLEdBQUcsbUJBQW1CLENBQUM7UUFFcEUsTUFBTSxNQUFNLEdBQUcsTUFBTSxrQkFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsTUFBTSxRQUFRLEdBQW1DLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBTyxJQUFJLEVBQUUsRUFBRTtZQUMxRSxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQyxNQUFNLElBQUksR0FBRyxNQUFNLGtCQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBUyxPQUFPLENBQUMsV0FBVyxDQUFDO2dCQUFFLE9BQU87WUFFcEQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBUyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3hELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3BCO2lCQUFNLElBQUksT0FBTyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQ25ELE9BQU8saUJBQWlCLGlDQUFNLE9BQU8sS0FBRSxPQUFPLEVBQUUsSUFBSSxHQUFHLEdBQUcsS0FBSSxNQUFNLENBQUMsQ0FBQzthQUN0RTtRQUNGLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDSCxNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFM0MsTUFBTSxDQUFDLEdBQXNCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUzQyxPQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBQUE7QUF4QkQsOENBd0JDO0FBRUQsU0FBZ0IsR0FBRyxDQUFDLEdBQUcsSUFBUztJQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3RFLENBQUM7QUFGRCxrQkFFQyJ9