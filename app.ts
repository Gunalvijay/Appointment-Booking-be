import express from "express";
import appointmentRouter from "./infrastructure/web/routes/appointment.route";
import { errorMiddleware } from "./infrastructure/web/middleware/error.middleware";

const app = express();

app.use(express.json());

app.use(
    "/appointments", 
    appointmentRouter
);

app.use(errorMiddleware);

export default app;