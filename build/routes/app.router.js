"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const donation_router_1 = __importDefault(require("./donation/donation.router"));
const appRouter = (0, express_1.default)();
appRouter.use("/donation", donation_router_1.default);
exports.default = appRouter;
