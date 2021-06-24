import { Router } from "express";
import userRouter from "./user.router";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
import { hasRole } from "../middlewares/role.middleware";

const routes = Router();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../utils/swagger_output.json");
//routers here :
routes.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
routes.use(
  "/users",
  authenticationMiddleware,
  // hasRole(["technicalService", "saleDepartment"]),
  userRouter
);

export default routes;
