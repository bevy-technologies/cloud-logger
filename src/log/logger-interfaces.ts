import {SeverityNames} from "./logging-options";

export interface CloudLoggerInterface {
    info(message: any, extra: any): void;

    warn(message: any, extra: any): void;

    debug(message: any, extra: any): void;

    error(message: any, extra: any): void;

    emergency(message: any, extra: any): void;

    critical(message: any, extra: any): void;

    alert(message: any, extra: any): void;

    notice(message: any, extra: any): void;
}

export interface CloudLoggerAdapterInterface {
    log: (
        message: any,
        extra: any,
        severity: SeverityNames,
    ) => void
}