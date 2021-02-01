/// <reference types="node" />
import { Application, NextFunction, Request, Response, Router } from "express";
import { Server as HTTPServer } from "http";
import "express-async-errors";
import "missing-native-js-functions";
declare global {
    namespace Express {
        interface Request {
            server: Server;
        }
    }
}
export declare type ServerOptions = {
    port: number;
    host: string;
    production: boolean;
    errorHandler?: {
        (err: Error, req: Request, res: Response, next: NextFunction): any;
    };
    jsonBody: boolean;
};
export declare class Server {
    app: Application;
    http: HTTPServer;
    options: ServerOptions;
    routes: Router[];
    constructor(opts?: Partial<ServerOptions>);
    protected secureExpress(): void;
    errorHandler(error: Error, req: Request, res: Response, next: NextFunction): void;
    start(): Promise<void>;
    registerRoutes(root: string): Promise<any[]>;
    registerRoute(root: string, file: string): any;
    stop(): Promise<void>;
}
