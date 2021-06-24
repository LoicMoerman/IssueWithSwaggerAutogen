import { NextFunction, Request, Response } from "express";

const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    next();
  } catch (err) {
    console.error("error", err);
    res.status(500).json({ msg: "Server error" });
  }
};

export { authenticationMiddleware };
