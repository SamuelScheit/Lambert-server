import "missing-native-js-functions";
import { NextFunction, Request, Response } from "express";

const OPTIONAL_PREFIX = "$";

export function check(schema: any) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			instanceOf(schema, req.body, "body");
			next();
		} catch (error) {
			next(error);
		}
	};
}

export function instanceOf(type: any, value: any, path: string = "", optional = false): Boolean {
	if (optional && value == null) return true;

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
			return type.every((t, i) => instanceOf(t, value[i], `${path}[${i}]`, optional));
		}

		const diff = Object.keys(value).missing(
			Object.keys(type).map((x) => (x.startsWith(OPTIONAL_PREFIX) ? x.slice(OPTIONAL_PREFIX.length) : x))
		);

		if (diff.length) throw new Error(`Unkown key '${diff}' in ${path}`);

		return Object.keys(type).every((key) => {
			let newKey = key;
			const OPTIONAL = key.startsWith(OPTIONAL_PREFIX);
			if (OPTIONAL) newKey = newKey.slice(OPTIONAL_PREFIX.length);

			return instanceOf(type[key], value[newKey], `${path}.${newKey}`, OPTIONAL);
		});
	}

	if (!type) return true; // no type was specified
	if (value instanceof type) return true;
	throw `${path} must be an instance of ${type}`;
}
