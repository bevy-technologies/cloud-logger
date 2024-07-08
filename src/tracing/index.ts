import axios from "axios";
import {randomUUID} from "crypto";
import { Request, Response, NextFunction } from 'express';

const createNamespace = require('continuation-local-storage').createNamespace;
const ns = createNamespace('logger-context');
const headerName: string = 'X-Cloud-Trace-Context';
const traceIdKey = 'trace-id';
const traceHeaderKey = 'trace-header';
const project = process.env.GOOGLE_CLOUD_PROJECT;

axios.interceptors.request.use((conf) => {
    conf.headers.set(headerName, getTraceHeader())
    return conf;
});

export const getTraceId = () => `projects/${project}/traces/${ns.get(traceIdKey)}`;
export const getTraceHeader = () => ns.get(traceHeaderKey);
export const expressTracingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    ns.run(() => {
        const header: string | undefined = req.header(headerName);
        const chunks: string[] | undefined = header?.split(';');
        if (chunks) {
            ns.set(traceHeaderKey, header ?? randomUUID());
            ns.set(traceIdKey, chunks[0]);
        }
        next();
    });
};