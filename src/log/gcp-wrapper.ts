import {Log, Logging} from "@google-cloud/logging";
import {Entry} from "@google-cloud/logging/build/src/entry";
import {google} from "@google-cloud/logging/build/protos/protos";
import LogEntry = google.logging.v2.LogEntry;
import ILogEntry = google.logging.v2.ILogEntry;

export class GcpWrapper {

    private readonly logger: Log;
    constructor(projectName: string, logName: string) {
        this.logger = new Logging({ projectId: projectName }).log(
            logName,
        );
    }

    public entry(entry: ILogEntry): Entry {
        return this.logger.entry(new LogEntry(entry));
    }
}