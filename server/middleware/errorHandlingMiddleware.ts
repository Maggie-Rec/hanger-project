import { Context, Next, Response } from 'koa';
import { HttpError } from '../interfaces/httpError';

const getErrorMessage = (error: Error): string => {
  if (error.stack) {
    return error.stack;
  }
  if (typeof error.toString === 'function') {
    return error.toString();
  }
  return '';
};

const errorMessageLog = (error: Error) => {
  console.error(error);
};

const checkErrorStatusCode = (status: number) => {
  return status >= 400 && status < 600;
};

const getHttpStatusCode = (error: HttpError, response: Response) => {
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

const errorHandlingMiddleware = async (
  ctx: Context,
  next: Next
): Promise<void> => {
  try {
    await next();
  } catch (error) {
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
};

export { errorHandlingMiddleware };
