import {CloudLoggerAdapterInterface} from "./logger-interfaces";
import {SeverityNames} from "./logging-options";

export class ConsoleLoggerAdapter implements CloudLoggerAdapterInterface {
    async log(message: any, extra: any, metadata: any, severity: SeverityNames): Promise<void> {
        switch (severity) {
            case "EMERGENCY":
            case "CRITICAL":
            case "ALERT":
            case "ERROR":
                console.error(message, extra);
                break
            case "WARNING":
                console.warn(message, extra);
            case "DEBUG":
                console.debug(message, extra);
                break
            case "INFO":
                console.info(message, extra);
                break
            case "NOTICE":
                console.log(message, extra);
                break
        }
    }

}