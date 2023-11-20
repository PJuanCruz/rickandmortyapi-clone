import { NextFunction, Request, Response } from 'express';

class AppController<T> {
  protected service: T;

  constructor(TService: { new (): T }) {
    this.service = new TService();
  }

  protected asyncHandler(
    asyncFn: (req: Request, res: Response, next: NextFunction) => Promise<any>
  ) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        return await asyncFn(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  } // TODO
}

export default AppController;
