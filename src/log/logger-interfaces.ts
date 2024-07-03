import {SeverityNames} from "./logging-options";

export interface CloudLoggerInterface {
    info(message: any, extra: any): Promise<void>;

    warn(message: any, extra: any): Promise<void>;

    debug(message: any, extra: any): Promise<void>;

    error(message: any, extra: any): Promise<void>;

    emergency(message: any, extra: any): Promise<void>;

    critical(message: any, extra: any): Promise<void>;

    alert(message: any, extra: any): Promise<void>;

    notice(message: any, extra: any): Promise<void>;
}

export interface CloudLoggerAdapterInterface {
    log: (
        message: any,
        extra: any,
        severity: SeverityNames,
    ) => Promise<void>
}