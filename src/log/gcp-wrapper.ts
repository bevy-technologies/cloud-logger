import {Log, Logging} from "@google-cloud/logging";
import {Entry} from "@google-cloud/logging/build/src/entry";
import {google} from "@google-cloud/logging/build/protos/protos";
import ILogEntry = google.logging.v2.ILogEntry;

export class GcpWrapper {

    private readonly logger: Log;

    constructor() {
        this.logger = new Logging().log('applications');
    }

    public async write(entry: ILogEntry, message: {}): Promise<Entry> {
        const e = this.logger.entry(entry, message);
        this.logger.write(e);
        return e;
    }
}