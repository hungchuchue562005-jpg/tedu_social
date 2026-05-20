import express from "express";
import type { Route } from "./core/interface";
import mongoose from "mongoose";

class App {
  public app: express.Application;
  public port: string | number;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 3002;

    this.connectToDatabase();
    this.initializeRoutes(routes);
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App is listening on the port ${this.port}`);
    });
  }

private async connectToDatabase() {
  try {
    const connectString = process.env.MONGODB_URI ;
   if (!connectString) {
      console.log("MONGODB_URI is not defined in the environment variables");
      return;
    }
    await mongoose.connect(connectString);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}
}

export default App;