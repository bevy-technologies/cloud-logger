import axios from "axios";
import { Request, Response, NextFunction } from 'express';

import { AsyncLocalStorage } from "node:async_hooks";
const headerName: string = 'X-Cloud-Trace-Context';
const project = process.env.GOOGLE_CLOUD_PROJECT;

axios.interceptors.request.use((conf) => {
    conf.headers.set(headerName, getTraceHeader())
    return conf;
});
const als = new AsyncLocalStorage();

export const getTraceId = () => `projects/${project}/traces/${als.getStore()}`;
export const getTraceHeader = () => als.getStore() as string;
export const expressTracingMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const header: string | undefined = req.header(headerName);
    const chunks: string[] | undefined = header?.split(';') ?? [];

    als.run(chunks?.find(() => true), () => {
        next();
    });
};
/*export const expressTracingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    ns.run(() => {
        const header: string | undefined = req.header(headerName);
        const chunks: string[] | undefined = header?.split(';');
        if (chunks) {
            ns.set(traceHeaderKey, header ?? randomUUID());
            ns.set(traceIdKey, chunks[0]);
        }
        next();
    });
};*/
