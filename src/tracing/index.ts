import axios from "axios";

const createNamespace = require('continuation-local-storage').createNamespace;
const ns = createNamespace('logger-context');
const headerName = 'X-Cloud-Trace-Context';
const project = process.env.GOOGLE_CLOUD_PROJECT;

axios.interceptors.request.use((conf) => {
    conf.headers.set(headerName, getTraceHeader())
    return conf;
});

export const getTraceId = () => `projects/${project}/traces/${ns.get('trace')}`;
export const getTraceHeader = () => ns.get('trace-header');
export const tracingMiddleware = (req, res, next) => {
    ns.run(() => {
        const header = req.headers[headerName];
        const chunks = header.split(';');
        if (chunks) {
            ns.set('trace-header', header);
            ns.set('trace-id', chunks[0]);
        }
        next();
    });
};