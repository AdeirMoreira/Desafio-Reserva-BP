import { app } from "./app";
import { errorMiddleware } from "./middleware/error/error.middleware";
import authRoutes from "./modules/auth/routes/auth.route";
import meetingRoutes from "./modules/meetings/routes/meeting.route";
import userRoutes from "./modules/users/routes/user.routes";

app.use('/login', authRoutes)
app.use("/user", userRoutes);
app.use("/meeting", meetingRoutes)

app.use(errorMiddleware);
