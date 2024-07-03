import {randomUUID, UUID} from "crypto";
import {Entry} from "@google-cloud/logging/build/src/entry";
import {GcpWrapper} from "./gcp-wrapper";
import {google} from "@google-cloud/logging/build/protos/protos";
import {LoggingOptions, LoggingOptionsDefaults, SeverityNames} from "./logging-options";
import {CloudLoggerAdapterInterface} from "./logger-interfaces";
import ILogEntry = google.logging.v2.ILogEntry;
import {getTraceId} from "../tracing";

export class GcpLoggerAdapter implements CloudLoggerAdapterInterface {
    /**
     * Statically track the all logs in a given execution of the
     * entire codebase.
     */
    static readonly applicationSpan: UUID = randomUUID();

    private readonly logger: GcpWrapper;

    constructor(logger?: GcpWrapper, private readonly options: LoggingOptions = LoggingOptionsDefaults) {
        const logName = this.options.logName ?? 'applications';
        this.logger = logger ?? new GcpWrapper(this.options.projectName, logName);
    }

    async log(
        message: any,
        extra: any = {},
        severity: SeverityNames,
    ) {
        this.entry(message, extra, severity);
    }

    private entry(message: any, extra: any, severity: SeverityNames): Entry {
        const applicationSpan: UUID = GcpLoggerAdapter.applicationSpan;
        const meta = {
            jsonPayload: {
                fields: {
                    applicationSpan: applicationSpan,
                    extra: extra,
                },
            },
            textPayload: message,
            severity: severity,
            resource: {
                labels: {
                    projectId: this.options.projectId,
                    projectName: this.options.projectName,
                    applicationId: this.options.applicationId,
                    deploymentId: this.options.deploymentId,
                    environment: this.options.environment,
                    service: this.options.serviceName,
                    version: this.options.version,
                },
            },
            traceSampled: false,
            trace: getTraceId(),
        } as ILogEntry;
        return this.logger.entry(meta);
    }
}