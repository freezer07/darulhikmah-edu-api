"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moment_1 = __importDefault(require("moment"));
const helloRouter = (0, express_1.default)();
helloRouter.get("/hello", (req, res) => {
    res.json({
        timeStamp: +(0, moment_1.default)().format("X"),
        appName: process.env.APP_NAME,
        statusMessage: "ready",
    });
});
exports.default = helloRouter;
