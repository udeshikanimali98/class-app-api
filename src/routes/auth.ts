import { Express } from "express";
import { UserEp } from "../end-point/user-ep";
import { Authentication } from "../middleware/authentication";

export function initAuthRoutes(app: Express) {
 
  app.post("/api/public/register", UserEp.register);
  app.post("/api/public/login", UserEp.login);
 
  app.post(
    "/api/auth/updateUserRole",
    Authentication.verifyToken,
    UserEp.updateUserRole
  );
  
}
