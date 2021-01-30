"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceOf = exports.check = void 0;
require("missing-native-js-functions");
const OPTIONAL_PREFIX = "$";
function check(schema) {
    return (req, res, next) => {
        try {
            instanceOf(schema, req.body, "body");
            next();
        }
        catch (error) {
            next(error);
        }
    };
}
exports.check = check;
function instanceOf(type, value, path = "", optional = false) {
    if (optional && value == null)
        return true;
    switch (type) {
        case String:
            if (typeof value === "string")
                return true;
            throw `${path} must be a string`;
        case Number:
            if (typeof value === "number" && !isNaN(value))
                return true;
            throw `${path} must be a number`;
        case BigInt:
            if (typeof value === "bigint")
                return true;
            throw `${path} must be a bigint`;
        case Boolean:
            if (typeof value === "boolean")
                return true;
            throw `${path} must be a boolean`;
    }
    if (typeof type === "object") {
        if (typeof value !== "object")
            throw `${path} must be a object`;
        if (Array.isArray(type)) {
            if (!Array.isArray(value))
                throw `${path} must be an array`;
            return type.every((t, i) => instanceOf(t, value[i], `${path}[${i}]`, optional));
        }
        const diff = Object.keys(value).missing(Object.keys(type).map((x) => (x.startsWith(OPTIONAL_PREFIX) ? x.slice(OPTIONAL_PREFIX.length) : x)));
        if (diff.length)
            throw new Error(`Unkown key '${diff}' in ${path}`);
        return Object.keys(type).every((key) => {
            let newKey = key;
            const OPTIONAL = key.startsWith(OPTIONAL_PREFIX);
            if (OPTIONAL)
                newKey = newKey.slice(OPTIONAL_PREFIX.length);
            return instanceOf(type[key], value[newKey], `${path}.${newKey}`, OPTIONAL);
        });
    }
    if (!type)
        return true; // no type was specified
    if (value instanceof type)
        return true;
    throw `${path} must be an instance of ${type}`;
}
exports.instanceOf = instanceOf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY2hlY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdUNBQXFDO0FBR3JDLE1BQU0sZUFBZSxHQUFHLEdBQUcsQ0FBQztBQUU1QixTQUFnQixLQUFLLENBQUMsTUFBVztJQUNoQyxPQUFPLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7UUFDMUQsSUFBSTtZQUNILFVBQVUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNyQyxJQUFJLEVBQUUsQ0FBQztTQUNQO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDWjtJQUNGLENBQUMsQ0FBQztBQUNILENBQUM7QUFURCxzQkFTQztBQUVELFNBQWdCLFVBQVUsQ0FBQyxJQUFTLEVBQUUsS0FBVSxFQUFFLE9BQWUsRUFBRSxFQUFFLFFBQVEsR0FBRyxLQUFLO0lBQ3BGLElBQUksUUFBUSxJQUFJLEtBQUssSUFBSSxJQUFJO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFFM0MsUUFBUSxJQUFJLEVBQUU7UUFDYixLQUFLLE1BQU07WUFDVixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFDM0MsTUFBTSxHQUFHLElBQUksbUJBQW1CLENBQUM7UUFDbEMsS0FBSyxNQUFNO1lBQ1YsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1lBQzVELE1BQU0sR0FBRyxJQUFJLG1CQUFtQixDQUFDO1FBQ2xDLEtBQUssTUFBTTtZQUNWLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtnQkFBRSxPQUFPLElBQUksQ0FBQztZQUMzQyxNQUFNLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQztRQUNsQyxLQUFLLE9BQU87WUFDWCxJQUFJLE9BQU8sS0FBSyxLQUFLLFNBQVM7Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFDNUMsTUFBTSxHQUFHLElBQUksb0JBQW9CLENBQUM7S0FDbkM7SUFDRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUM3QixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7WUFBRSxNQUFNLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQztRQUNoRSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUFFLE1BQU0sR0FBRyxJQUFJLG1CQUFtQixDQUFDO1lBQzVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDaEY7UUFFRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ25HLENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxNQUFNO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLElBQUksUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRXBFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN0QyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDakIsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNqRCxJQUFJLFFBQVE7Z0JBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTVELE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxJQUFJLElBQUksTUFBTSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFDLENBQUM7S0FDSDtJQUVELElBQUksQ0FBQyxJQUFJO1FBQUUsT0FBTyxJQUFJLENBQUMsQ0FBQyx3QkFBd0I7SUFDaEQsSUFBSSxLQUFLLFlBQVksSUFBSTtRQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ3ZDLE1BQU0sR0FBRyxJQUFJLDJCQUEyQixJQUFJLEVBQUUsQ0FBQztBQUNoRCxDQUFDO0FBMUNELGdDQTBDQyJ9