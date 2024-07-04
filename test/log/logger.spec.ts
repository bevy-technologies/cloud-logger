import resetAllMocks = jest.resetAllMocks;
import {Logger} from "../../src/log/logger";
import {CloudLoggerAdapterInterface} from "../../src/log/logger-interfaces";
import {GcpLoggerAdapter} from "../../src/log/gcp-logger-adapter";
import {LoggingOptionsDefaults} from "../../src/log/logging-options";
import {ConsoleLoggerAdapter} from "../../src/log/console-logger-adapter";

const extra = {test: "test"};
const message = "test";
const defaults = LoggingOptionsDefaults;
let mockedAdapter: CloudLoggerAdapterInterface;
beforeEach(() => {
    process.env.GOOGLE_CLOUD_PROJECT = 'dev-bevy-express-com'
    mockedAdapter = {
        log: jest.fn(),
    };
})

afterEach(() => {
    resetAllMocks();
})
describe("Logger", () => {
    it("can be created with console logger adapter", async () => {
        const logger = new Logger(new ConsoleLoggerAdapter());
        expect(logger).toBeInstanceOf(Logger);
    });
    it("can be created with cloud logger adapter", async () => {
        const logger = new Logger(new GcpLoggerAdapter());
        expect(logger).toBeInstanceOf(Logger);
        logger.warn("blah", extra);
        logger.alert(message, extra);
        logger.critical(message, extra);
        logger.error(message, extra);
        logger.warn(message, extra);
        logger.notice(message, extra);
        logger.info(message, extra);
        logger.debug(message, extra);
    });
    it("can be disabled", () => {
        const logger = new Logger(mockedAdapter, {
            ...defaults,
            logLevel: "NONE"
        });
        logger.emergency(message, extra)
        expect(mockedAdapter.log).not.toHaveBeenCalled();
        logger.alert(message, extra);
        expect(mockedAdapter.log).not.toHaveBeenCalled();
        logger.critical(message, extra);
        expect(mockedAdapter.log).not.toHaveBeenCalled();
        logger.error(message, extra);
        expect(mockedAdapter.log).not.toHaveBeenCalled();
        logger.warn(message, extra);
        expect(mockedAdapter.log).not.toHaveBeenCalled();
        logger.notice(message, extra);
        expect(mockedAdapter.log).not.toHaveBeenCalled();
        logger.info(message, extra);
        expect(mockedAdapter.log).not.toHaveBeenCalled();
        logger.debug(message, extra);
        expect(mockedAdapter.log).not.toHaveBeenCalled();
    });
    it("skips debug", () => {
        const logger = new Logger(mockedAdapter);
        logger.debug(message, extra);
        expect(mockedAdapter.log).not.toHaveBeenCalled();
    });
    it("logs debug", () => {
        const logger = new Logger(mockedAdapter, {
            ...defaults,
            logLevel: "DEBUG"
        });
        logger.debug(message, extra);
        expect(mockedAdapter.log).toHaveBeenCalledWith(message, extra, expect.anything(), "DEBUG");
    });
    it("logs emergency", () => {
        const logger = new Logger(mockedAdapter, {
            ...defaults,
            logLevel: "EMERGENCY"
        });
        logger.emergency(message, extra);
        expect(mockedAdapter.log).toHaveBeenCalledWith(message, extra, expect.anything(), "EMERGENCY");
    });
    it("logs alert", () => {
        const logger = new Logger(mockedAdapter, {
            ...defaults,
            logLevel: "ALERT"
        });
        logger.alert(message, extra);
        expect(mockedAdapter.log).toHaveBeenCalledWith(message, extra, expect.anything(), "ALERT");
    });
    it("logs critical", () => {
        const logger = new Logger(mockedAdapter, {
            ...defaults,
            logLevel: "CRITICAL"
        });
        logger.critical(message, extra);
        expect(mockedAdapter.log).toHaveBeenCalledWith(message, extra, expect.anything(), "CRITICAL");
    });
    it("logs error", () => {
        const logger = new Logger(mockedAdapter, {
            ...defaults,
            logLevel: "ERROR"
        });
        logger.error(message, extra);
        expect(mockedAdapter.log).toHaveBeenCalledWith(message, extra, expect.anything(), "ERROR");
    });
    it("logs warn", () => {
        const logger = new Logger(mockedAdapter, {
            ...defaults,
            logLevel: "WARNING"
        });
        logger.warn(message, extra);
        expect(mockedAdapter.log).toHaveBeenCalledWith(message, extra, expect.anything(), "WARNING");
    });
    it("logs notice", () => {
        const logger = new Logger(mockedAdapter, {
            ...defaults,
            logLevel: "NOTICE"
        });
        logger.notice(message, extra);
        expect(mockedAdapter.log).toHaveBeenCalledWith(message, extra, expect.anything(), "NOTICE");
    });
    it("logs info", () => {
        const logger = new Logger(mockedAdapter, {
            ...defaults,
            logLevel: "INFO"
        });
        logger.info(message, extra);
        expect(mockedAdapter.log).toHaveBeenCalledWith(message, extra, expect.anything(), "INFO");
    });
    it("Default to INFO on unknown log level", () => {
        const logger = new Logger(mockedAdapter, {
            ...defaults,
            logLevel: "WHATEVER"
        });
        logger.info(message, extra);
        expect(mockedAdapter.log).toHaveBeenCalledWith(message, extra, expect.anything(), "INFO");
    });
})