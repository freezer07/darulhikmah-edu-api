"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const donationRouter = (0, express_1.default)();
donationRouter.get("/donation-status", (req, res) => { });
exports.default = donationRouter;
