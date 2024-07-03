import resetAllMocks = jest.resetAllMocks;
import {Logger} from "../../src/log/logger";
import {CloudLoggerAdapterInterface} from "../../src/log/logger-interfaces";
import {SeverityNames} from "../../src/log/logging-options";

const extra = {test: "test"};
const message = "test";
let mockedAdapter: CloudLoggerAdapterInterface;
beforeEach(() => {
    mockedAdapter = {
        log: jest.fn(),
    };
})

afterEach(() => {
    resetAllMocks();
})
describe("Logger", () => {
    it("can be disabled", () => {
        const logger = new Logger(mockedAdapter, "NONE");
        logger.emergency(message, extra).then(() => {
            expect(mockedAdapter.log).not.toHaveBeenCalled();
        });
        logger.alert(message, extra).then(() => {
            expect(mockedAdapter.log).not.toHaveBeenCalled();
        });
        logger.critical(message, extra).then(() => {
            expect(mockedAdapter.log).not.toHaveBeenCalled();
        });
        logger.error(message, extra).then(() => {
            expect(mockedAdapter.log).not.toHaveBeenCalled();
        });
        logger.warn(message, extra).then(() => {
            expect(mockedAdapter.log).not.toHaveBeenCalled();
        });
        logger.notice(message, extra).then(() => {
            expect(mockedAdapter.log).not.toHaveBeenCalled();
        });
        logger.info(message, extra).then(() => {
            expect(mockedAdapter.log).not.toHaveBeenCalled();
        });
        logger.debug(message, extra).then(() => {
            expect(mockedAdapter.log).not.toHaveBeenCalled();
        });
    });
    it("skips debug", () => {
        const logger = new Logger(mockedAdapter);
        logger.debug(message, extra).then(() => {
            expect(mockedAdapter.log).not.toHaveBeenCalled();
        });
    });
    it("logs debug", () => {
        const logger = new Logger(mockedAdapter, "DEBUG");
        logger.debug(message, extra).then(() => {
            expect(mockedAdapter.log).toHaveBeenCalledWith(message, extra, "DEBUG");
        });
    });
    it("logs emergency", () => {
        const logger = new Logger(mockedAdapter);
        logger.emergency(message, extra).then(() => {
            expect(mockedAdapter.log).toHaveBeenCalledWith(message, extra, "EMERGENCY");
        });
    });
    it("logs alert", () => {
        const logger = new Logger(mockedAdapter);
        logger.alert(message, extra).then(() => {
            expect(mockedAdapter.log).toHaveBeenCalledWith(message, extra, "ALERT");
        });
    });
    it("logs critical", () => {
        const logger = new Logger(mockedAdapter);
        logger.critical(message, extra).then(() => {
            expect(mockedAdapter.log).toHaveBeenCalledWith(message, extra, "CRITICAL");
        });
    });
    it("logs error", () => {
        const logger = new Logger(mockedAdapter);
        logger.error(message, extra).then(() => {
            expect(mockedAdapter.log).toHaveBeenCalledWith(message, extra, "ERROR");
        });
    });
    it("logs warn", () => {
        const logger = new Logger(mockedAdapter);
        logger.warn(message, extra).then(() => {
            expect(mockedAdapter.log).toHaveBeenCalledWith(message, extra, "WARNING");
        });
    });
    it("logs notice", () => {
        const logger = new Logger(mockedAdapter);
        logger.notice(message, extra).then(() => {
            expect(mockedAdapter.log).toHaveBeenCalledWith(message, extra, "NOTICE");
        });
    });
    it("logs info", () => {
        const logger = new Logger(mockedAdapter);
        logger.info(message, extra).then(() => {
            expect(mockedAdapter.log).toHaveBeenCalledWith(message, extra, "INFO");
        });
    });

})