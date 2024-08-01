import { Express, Request, Response } from "express";
import { Util } from "../common/util";
import { initAuthRoutes } from "./auth";

export function initRoutes(app: Express) {
  /* TOP LEVEL */
  app.get("/api", (req: Request, res: Response) =>
    Util.sendSuccess(res, "Project™ Api")
  );

  initAuthRoutes(app);

  /* ALL INVALID REQUESTS */
  app.all("*", (req: Request, res: Response) =>
    Util.sendError(res, "Route Not Found")
  );
}
