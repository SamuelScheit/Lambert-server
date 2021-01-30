"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceOf = exports.Tuple = exports.check = void 0;
require("missing-native-js-functions");
const OPTIONAL_PREFIX = "$";
function check(schema) {
    return (req, res, next) => {
        try {
            const result = instanceOf(schema, req.body, { path: "body" });
            if (result === true)
                return next();
            throw result;
        }
        catch (error) {
            next(error);
        }
    };
}
exports.check = check;
class Tuple {
    constructor(...types) {
        this.types = types;
    }
}
exports.Tuple = Tuple;
function instanceOf(type, value, { path = "", optional = false } = {}) {
    var _a;
    if (!type)
        return true; // no type was specified
    if (value == null) {
        if (optional)
            return true;
        throw `${path} is required`;
    }
    switch (type) {
        case String:
            if (typeof value === "string")
                return true;
            throw `${path} must be a string`;
        case Number:
            value = Number(value);
            if (typeof value === "number" && !isNaN(value))
                return true;
            throw `${path} must be a number`;
        case BigInt:
            try {
                value = BigInt(value);
                if (typeof value === "bigint")
                    return true;
            }
            catch (error) { }
            throw `${path} must be a bigint`;
        case Boolean:
            if (value == "true")
                value = true;
            if (value == "false")
                value = false;
            if (typeof value === "boolean")
                return true;
            throw `${path} must be a boolean`;
    }
    if (typeof type === "object") {
        if (((_a = type === null || type === void 0 ? void 0 : type.constructor) === null || _a === void 0 ? void 0 : _a.name) != "Object") {
            if (type instanceof Tuple) {
                if (type.types.some((x) => instanceOf(x, value, { path, optional })))
                    return true;
                throw `${path} must be one of ${type.types}`;
            }
            if (value instanceof type)
                return true;
            throw `${path} must be an instance of ${type}`;
        }
        if (typeof value !== "object")
            throw `${path} must be a object`;
        if (Array.isArray(type)) {
            if (!Array.isArray(value))
                throw `${path} must be an array`;
            if (!type.length)
                return true; // type array didn't specify any type
            return value.every((val, i) => instanceOf(type[0], val, { path: `${path}[${i}]`, optional }));
        }
        const diff = Object.keys(value).missing(Object.keys(type).map((x) => (x.startsWith(OPTIONAL_PREFIX) ? x.slice(OPTIONAL_PREFIX.length) : x)));
        if (diff.length)
            throw `Unkown key ${diff}`;
        return Object.keys(type).every((key) => {
            let newKey = key;
            const OPTIONAL = key.startsWith(OPTIONAL_PREFIX);
            if (OPTIONAL)
                newKey = newKey.slice(OPTIONAL_PREFIX.length);
            return instanceOf(type[key], value[newKey], {
                path: `${path}.${newKey}`,
                optional: OPTIONAL,
            });
        });
    }
    else if (typeof type === "number" || typeof type === "string" || typeof type === "boolean") {
        if (value === type)
            return true;
        throw `${path} must be ${value}`;
    }
    else if (typeof type === "bigint") {
        if (BigInt(value) === type)
            return true;
        throw `${path} must be ${value}`;
    }
    return type == value;
}
exports.instanceOf = instanceOf;
//# sourceMappingURL=check.js.map