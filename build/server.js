"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 3000;
const startServer = async () => {
    app_1.default.listen(PORT, () => {
        console.log(`${process.env.APP_NAME} listening on PORT `, PORT);
        console.log(`open browser and go to htttp://localhost:${PORT}`);
    });
};
startServer();
