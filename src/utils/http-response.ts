import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ENV } from '../config/config';

class HttpResponse {
  static NotFound(req: Request, res: Response, next: NextFunction) {
    const status = StatusCodes.NOT_FOUND;
    const message = 'There is nothing here.';

    return res.status(status).json({ error: message });
  }

  static internalServerError(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || ReasonPhrases.INTERNAL_SERVER_ERROR;

    if (ENV === 'development') {
      console.log(error);
    }

    return res.status(status).json({ error: message });
  }
}

export default HttpResponse;
