import {LoggingOptions, LoggingOptionsDefaults, Severity, severityKeys, SeverityNames} from "./logging-options";
import {CloudLoggerAdapterInterface, CloudLoggerInterface} from "./logger-interfaces";

export class Logger implements CloudLoggerInterface {
    private readonly logLevel: SeverityNames;

    constructor(
        private readonly adapter: CloudLoggerAdapterInterface,
        private readonly loggingOptions: LoggingOptions = LoggingOptionsDefaults
    ) {
        const logLevel = loggingOptions.logLevel;
        this.logLevel = severityKeys.includes(logLevel)
            ? logLevel as SeverityNames
            : "INFO"
    }

    async alert(message: any, extra: any = {}): Promise<void> {
        return this.log(message, extra, "ALERT");
    }

    async critical(message: any, extra: any = {}): Promise<void> {
        return this.log(message, extra, "CRITICAL");
    }

    async debug(message: any, extra: any = {}): Promise<void> {
        return this.log(message, extra, "DEBUG");
    }

    async emergency(message: any, extra: any = {}): Promise<void> {
        return this.log(message, extra, "EMERGENCY");
    }

    async error(message: any, extra: any = {}): Promise<void> {
        return this.log(message, extra, "ERROR");
    }

    async info(message: any, extra: any = {}): Promise<void> {
        return this.log(message, extra, "INFO");
    }

    async notice(message: any, extra: any = {}): Promise<void> {
        return this.log(message, extra, "NOTICE");
    }

    async warn(message: any, extra: any = {}): Promise<void> {
        return this.log(message, extra, "WARNING");
    }

    private async log(
        message: any,
        extra: any = {},
        severity: SeverityNames,
    ) {
        return this.shouldLog(severity)
            ? await this.adapter.log(message, extra, this.loggingOptions, severity)
            : undefined;
    }

    private shouldLog(level: SeverityNames) {
        return Severity[level] <= Severity[this.logLevel];
    }
}