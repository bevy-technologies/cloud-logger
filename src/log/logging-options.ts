export enum Severity {
    NONE = -1,
    EMERGENCY = 0,
    ALERT = 1,
    CRITICAL = 2,
    ERROR = 3,
    WARNING = 4,
    NOTICE = 5,
    INFO = 6,
    DEBUG = 7,
}

export type SeverityNames = keyof typeof Severity;
export const severityKeys = Object.keys(Severity) as string[];

export interface LoggingOptions {
    projectName: string;
    applicationId: string;
    deploymentId: string;
    environment: string;
    serviceName: string;
    version: string;
    projectId: string;
    logLevel: string;
}

export const LoggingOptionsDefaults: LoggingOptions = {
    projectName: process.env.GOOGLE_CLOUD_PROJECT ?? '',
    applicationId: process.env.GAE_APPLICATION ?? '',
    deploymentId: process.env.GAE_DEPLOYMENT_ID ?? '',
    environment: process.env.GAE_ENV ?? '',
    serviceName: process.env.GAE_SERVICE ?? '',
    version: process.env.GAE_VERSION ?? '',
    projectId: process.env.GOOGLE_CLOUD_PROJECT ?? '',
    logLevel: process.env.CLOUD_LOGGER_LEVEL ?? '',
};