import axios from "axios";
import { Request, Response, NextFunction } from 'express';

import { AsyncLocalStorage } from "node:async_hooks";
const headerName: string = 'X-Cloud-Trace-Context';
const project = process.env.GOOGLE_CLOUD_PROJECT;
type TraceContext = {
    traceId: string;
    spanId: string;
}
axios.interceptors.request.use((conf) => {
    conf.headers.set(headerName, getTraceHeader())
    return conf;
});
const als = new AsyncLocalStorage();
const extractTraceContext = (): TraceContext => {
    const raw =  als.getStore() as string ?? '{}';
    return JSON.parse(raw);
}
export const getSpanId = () => extractTraceContext().spanId;
export const getTraceId = () => `projects/${project}/traces/${extractTraceContext().traceId}`;
export const getTraceHeader = () => extractTraceContext().traceId;
export const expressTracingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let rawContext = '{}';
    const header: string | undefined = req.header(headerName);
    const chunks: string[] | undefined = header?.split(';') ?? [];
    if(header) {
        const ids = chunks?.find(() => true)?.toString().split('/');
        rawContext  = JSON.stringify({
            traceId: ids?.[0] ?? '',
            spanId: ids?.[1] ?? ''
        });
    }
    als.run(rawContext, () => {
        next();
    });
};