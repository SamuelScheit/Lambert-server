import "missing-native-js-functions";
import { NextFunction, Request, Response } from "express";
export declare function check(schema: any): (req: Request, res: Response, next: NextFunction) => void;
export declare function instanceOf(type: any, value: any, path?: string, optional?: boolean): Boolean;
