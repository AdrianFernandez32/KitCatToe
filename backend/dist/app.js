"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("./config/dotenv"));
const db_1 = __importDefault(require("./config/db"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.default)();
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/api", routes_1.default);
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    db_1.default.connect();
});
exports.default = app;
