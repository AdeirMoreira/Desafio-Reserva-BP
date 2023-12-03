import { app } from "./app";
import { errorMiddleware } from "./middleware/error/error.middleware";
import usersRoutes from "./modules/users/routes/users.routes";

app.use("/users", usersRoutes);

app.use(errorMiddleware);
