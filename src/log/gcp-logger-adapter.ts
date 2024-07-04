import {randomUUID, UUID} from "crypto";
import {Entry} from "@google-cloud/logging/build/src/entry";
import {GcpWrapper} from "./gcp-wrapper";
import {google} from "@google-cloud/logging/build/protos/protos";
import {LoggingOptions, LoggingOptionsDefaults, SeverityNames} from "./logging-options";
import {CloudLoggerAdapterInterface} from "./logger-interfaces";
import {getTraceId} from "../tracing";
import ILogEntry = google.logging.v2.ILogEntry;

export class GcpLoggerAdapter implements CloudLoggerAdapterInterface {
    /**
     * Statically track the all logs in a given execution of the
     * entire codebase.
     */
    static readonly applicationSpan: UUID = randomUUID();

    private readonly logger: GcpWrapper;

    constructor(logger?: GcpWrapper, private readonly options: LoggingOptions = LoggingOptionsDefaults) {
        this.logger = logger ?? new GcpWrapper();
    }

    async log(
        message: any,
        extra: any = {},
        meta: any = {},
        severity: SeverityNames,
    ) {
        await this.entry(message, extra, meta, severity);
    }

    private async entry(message: any, extra: any, metadata: any, severity: SeverityNames): Promise<Entry> {
        const applicationSpan: UUID = GcpLoggerAdapter.applicationSpan;
        const msg: any = {
            message,
            metadata,
            applicationSpan: applicationSpan,
            context: extra,
            textPayload: message,
        };
        const meta = {
            severity: severity,
            traceSampled: false,
            trace: getTraceId(),
        } as ILogEntry;
        return this.logger.write(meta, msg);
    }
}