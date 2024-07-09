import { LogContext, Logger, LoggerNamespace } from '@mikro-orm/core';
import {logger} from "../index";

export class MikroOrmCloudLogger implements Logger {
    log(message: any, ...optionalParams: any[]) {
        logger.info(message, optionalParams);
    }
    error(message: any, ...optionalParams: any[]) {
        logger.error(message, optionalParams);
    }
    warn(message: any, ...optionalParams: any[]) {
        logger.warn(message, optionalParams);
    }
    logQuery(context: LogContext): void {
        this.log(context.query);
    }

    setDebugMode(debugMode: boolean | LoggerNamespace[]): void {
        return;
    }
    isEnabled(namespace: LoggerNamespace): boolean {
        return true;
    }
}
