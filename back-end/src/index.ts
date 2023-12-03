import { app } from "./app";
import { errorMiddleware } from "./middleware/error/error.middleware";
import authRoutes from "./modules/auth/routes/auth.route";
import usersRoutes from "./modules/users/routes/users.routes";

app.use('/login', authRoutes)

app.use("/users", usersRoutes);

app.use(errorMiddleware);
