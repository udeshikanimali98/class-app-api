import { Express } from "express";
import { UserEp } from "../end-point/user-ep";
import { Authentication } from "../middleware/authentication";


export function initAuthRoutes(app: Express) {
  // PUBLIC ROUTES

 
  app.post("/api/public/register", UserEp.register);
  
 
 
}
