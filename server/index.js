"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const cors_1 = __importDefault(require("@koa/cors"));
// import userRoutes from './routes/userRoutes';
const addressRoutes_1 = __importDefault(require("./routes/addressRoutes"));
// import itemRoutes from './routes/itemRoutes';
const errorHandlingMiddleware_1 = require("./middleware/errorHandlingMiddleware");
const app = new koa_1.default();
const PORT = 3020;
app.use(errorHandlingMiddleware_1.errorHandlingMiddleware);
app.use((0, cors_1.default)());
app.use((0, koa_bodyparser_1.default)());
// app.use(userRoutes.routes());
// app.use(userRoutes.allowedMethods());
app.use(addressRoutes_1.default.routes());
app.use(addressRoutes_1.default.allowedMethods());
// app.use(itemRoutes.routes());
// app.use(itemRoutes.allowedMethods());
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));