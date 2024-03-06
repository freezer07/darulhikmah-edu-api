"use strict";
// src/index.ts
// minimal Express API
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// custom router
const app_router_1 = __importDefault(require("./routes/app.router"));
const hello_router_1 = __importDefault(require("./routes/hello.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/", hello_router_1.default);
app.use("/api", app_router_1.default);
exports.default = app;
