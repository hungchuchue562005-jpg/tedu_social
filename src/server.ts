import "dotenv/config";

import { Indexroute } from "@modules/index";
import App from "./app";
import { validateEnv } from "@core/utils";


validateEnv();
const routes = [new Indexroute()];

const app = new App(routes);

app.listen();