import express from "express";
import type { Route } from "@core/interface";
import mongoose from "mongoose";
import hpp from "hpp";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import Logger from "@core/utils/logger";
import errorMiddleware from "./core/middleware/error.middleware";

class App {
  public app: express.Application;
  public port: string | number;
  public production : boolean ;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 3002;
    this.production = process.env.NODE_ENV === "production" ? true : false;
    this.connectToDatabase();
    this.initializeRoutes(routes);
    this.initializeMiddleware();
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      Logger.info(`App is listening on the port ${this.port}`);
    });
  }

  private initializeMiddleware() {
        if (this.production) {
            this.app.use(morgan("combined"));
            this.app.use(hpp());
            this.app.use(helmet());
            this.app.use(cors({ origin: "your.domain.com", credentials: true }));
        } else {
            this.app.use(morgan("dev"));
            this.app.use(cors({ origin: true, credentials: true }));
        }
        this.app.use(errorMiddleware);
    }
private async connectToDatabase() {

    const connectString = process.env.MONGODB_URI;

    if (!connectString) {
        Logger.error("Connection string is not defined in environment variables");
        return;
    }
    try {

        await mongoose.connect(connectString);

        Logger.info("Connected to MongoDB successfully");

    } catch (reason) {

        Logger.error("Failed to connect to MongoDB", reason);

    }
}
}

export default App;