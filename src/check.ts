import { NextFunction, Request, Response } from "express";

export function check(schema: any) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			instanceOf(schema, req.body);
			next();
		} catch (error) {
			next(error);
		}
	};
}

export function instanceOf(type: any, value: any, path: string = ""): Boolean {
	switch (type) {
		case String:
			if (typeof value === "string") return true;
			throw `${path} must be a string`;
		case Number:
			if (typeof value === "number" && !isNaN(value)) return true;
			throw `${path} must be a number`;
		case BigInt:
			if (typeof value === "bigint") return true;
			throw `${path} must be a bigint`;
		case Boolean:
			if (typeof value === "boolean") return true;
			throw `${path} must be a boolean`;
	}
	if (typeof type === "object") {
		if (typeof value !== "object") throw `${path} must be a object`;
		if (Array.isArray(type)) {
			if (!Array.isArray(value)) throw `${path} must be an array`;
			return type.every((t, i) => instanceOf(t, value[i], `${path}[${i}]`));
		}
		return Object.keys(type).every((key) => instanceOf(type[key], value[key], `${path}.${key}`));
	}

	if (!type) return true; // no type was specified
	if (value instanceof type) return true;
	throw `${path} must be an instance of ${type}`;
}
