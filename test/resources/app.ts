import { Request, Response } from "express";
import {expressTracingMiddleware, getTraceHeader, logger} from "../../src";
const express = require("express");
const app = express();

app.use(expressTracingMiddleware)
    .get("/", (req: Request, res: Response) => {
        try {
            logger.error("HELLO WORLD");
            res.send(getTraceHeader());
        } catch (e) {
            console.log(e)
        }
    });

export default app;