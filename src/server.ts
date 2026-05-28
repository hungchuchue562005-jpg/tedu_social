import "dotenv/config";

import { Indexroute } from "@modules/index";
import App from "./app";
import { validateEnv } from "@core/utils";
import UsersRoute from "./modules/users/user.route";
import AuthRoute from "./modules/auth/auth.route";
import ProfileRoute from "./modules/profile/profile.route";
import PostsRoute from "./modules/posts/posts.route";

validateEnv();
const routes = [
    new Indexroute(),
    new UsersRoute(),
    new AuthRoute(),
    new ProfileRoute(),
    new PostsRoute(),
];

const app = new App(routes);

app.listen();