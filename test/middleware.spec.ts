import {Logger} from "../src/log/logger";
import {ConsoleLoggerAdapter} from "../src/log/console-logger-adapter";

import request from "supertest";
import app from "./resources/app";


describe("Logger", () => {
    it("can be created with console logger adapter", async () => {
        return request(app)
            .get('/')
            .set('X-Cloud-Trace-Context', 'test-once/test-again')
            .expect(200)
            .then(response => {
                expect(response.text).toBe("test-once");
            });
    });
});