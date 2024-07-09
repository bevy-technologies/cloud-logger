import {Logger} from "./log/logger";
import {GcpLoggerAdapter} from "./log/gcp-logger-adapter";
import {LoggingOptionsDefaults} from "./log/logging-options";
import {GcpWrapper} from "./log/gcp-wrapper";
import {ConsoleLoggerAdapter} from "./log/console-logger-adapter";
import {NestCloudLogger} from "./nestjs/gcp-nest-logger.service";

const adapter = process.env.CLOUD_LOGGER_CONSOLE_FALLBACK
    ? new ConsoleLoggerAdapter()
    : new GcpLoggerAdapter(new GcpWrapper(), LoggingOptionsDefaults);
export {expressTracingMiddleware, getTraceId, getTraceHeader} from "./tracing";
export {NestCloudLogger}  from "./nestjs/gcp-nest-logger.service";
export {MikroOrmCloudLogger} from "./mikro-orm/mikro-orm-logger.service";
export const logger = new Logger(adapter);