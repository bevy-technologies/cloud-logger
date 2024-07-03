import {Logger} from "./log/logger";
import {GcpLoggerAdapter} from "./log/gcp-logger-adapter";

const adapter = new GcpLoggerAdapter();
export const logger = new Logger(adapter);