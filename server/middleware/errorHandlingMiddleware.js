"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlingMiddleware = void 0;
const getErrorMessage = (error) => {
    if (error.stack) {
        return error.stack;
    }
    if (typeof error.toString === 'function') {
        return error.toString();
    }
    return '';
};
const errorMessageLog = (error) => {
    console.error(error);
};
const checkErrorStatusCode = (status) => {
    return status >= 400 && status < 600;
};
const getHttpStatusCode = (error, response) => {
    const errorStatusCode = error.status || error.statusCode || 0;
    if (checkErrorStatusCode(errorStatusCode)) {
        return errorStatusCode;
    }
    const responseStatusCode = response.status;
    if (checkErrorStatusCode(responseStatusCode)) {
        return responseStatusCode;
    }
    return 500;
};
const errorHandlingMiddleware = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield next();
    }
    catch (error) {
        if (error instanceof Error) {
            const errorMessage = getErrorMessage(error);
            errorMessageLog(error);
            if (ctx.res.headersSent) {
                return next();
            }
            const errorResponse = {
                statusCode: getHttpStatusCode(error, ctx.response),
                body: undefined,
            };
            ctx.status = errorResponse.statusCode;
            ctx.type = 'application/json';
            ctx.body = { message: errorMessage };
        }
    }
});
exports.errorHandlingMiddleware = errorHandlingMiddleware;
