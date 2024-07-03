import {Severity, SeverityNames} from "./logging-options";
import {CloudLoggerAdapterInterface, CloudLoggerInterface} from "./logger-interfaces";

export class Logger implements CloudLoggerInterface {

    constructor(
        private readonly adapter: CloudLoggerAdapterInterface,
        private readonly logLevel: SeverityNames = "INFO"
    ) {
    }

    alert(message: any, extra: any = {}): void {
        return this.log(message, extra, "ALERT");
    }

    critical(message: any, extra: any = {}): void {
        return this.log(message, extra, "CRITICAL");
    }

    debug(message: any, extra: any = {}): void {
        return this.log(message, extra, "DEBUG");
    }

    emergency(message: any, extra: any = {}): void {
        return this.log(message, extra, "EMERGENCY");
    }

    error(message: any, extra: any = {}): void {
        return this.log(message, extra, "ERROR");
    }

    info(message: any, extra: any = {}): void {
        return this.log(message, extra, "INFO");
    }

    notice(message: any, extra: any = {}): void {
        return this.log(message, extra, "NOTICE");
    }

    warn(message: any, extra: any = {}): void {
        return this.log(message, extra, "WARNING");
    }

    private log(
        message: any,
        extra: any = {},
        severity: SeverityNames,
    ) {
        this.shouldLog(severity)
            ? this.adapter.log(message, extra, severity)
            : undefined;
    }

    private shouldLog(level: SeverityNames) {
        return Severity[level] <= Severity[this.logLevel];
    }
}