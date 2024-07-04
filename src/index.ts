import {Logger} from "./log/logger";
import {GcpLoggerAdapter} from "./log/gcp-logger-adapter";
import {LoggingOptionsDefaults} from "./log/logging-options";
import {GcpWrapper} from "./log/gcp-wrapper";

const adapter = new GcpLoggerAdapter(new GcpWrapper(), LoggingOptionsDefaults);
export const logger = new Logger(adapter);