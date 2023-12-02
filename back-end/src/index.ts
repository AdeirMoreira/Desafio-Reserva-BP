import { app } from "./app";
import { errorMiddleware } from "./middleware/error/error.middleware";
import brokersRoutes from "./modules/brokers/routes/brokers.routes";

app.use('/brokers', brokersRoutes)

app.use(errorMiddleware)
