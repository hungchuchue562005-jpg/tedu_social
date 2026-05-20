// import { Indexroute } from "./modules/index";   
// import App from "./app";
// import dotenv from "dotenv";
// const routes = [new Indexroute()];

// const app = new App(routes);

// dotenv.config();
// app.listen();   

import "dotenv/config";

import { Indexroute } from "./modules/index";
import App from "./app";

const routes = [new Indexroute()];

const app = new App(routes);

app.listen();