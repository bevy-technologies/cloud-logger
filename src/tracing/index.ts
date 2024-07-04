import axios from "axios";
import {randomUUID} from "crypto";

const createNamespace = require('continuation-local-storage').createNamespace;
const ns = createNamespace('logger-context');
const headerName: string = 'X-Cloud-Trace-Context';
const project = process.env.GOOGLE_CLOUD_PROJECT;

axios.interceptors.request.use((conf) => {
    conf.headers.set(headerName, getTraceHeader())
    return conf;
});

export const getTraceId = () => `projects/${project}/traces/${ns.get('trace')}`;
export const getTraceHeader = () => ns.get('trace-header');
export const tracingMiddleware = (req: Request, res: Response, next: () => void) => {
    ns.run(() => {
        const header: string | null = req.headers.get(headerName);
        const chunks: string[] | undefined = header?.split(';');
        if (chunks) {
            ns.set('trace-header', header ?? randomUUID());
            ns.set('trace-id', chunks[0]);
        }
        next();
    });
};