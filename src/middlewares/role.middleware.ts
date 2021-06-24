import { NextFunction, Request, Response } from "express";

function hasRole(roles: string[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    console.log(roles);
    next();
  };
}

export { hasRole };
