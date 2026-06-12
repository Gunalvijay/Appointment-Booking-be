import { Router } from "express";
import { appointmentController } from "../../config/appointment.module";

const router = Router();

router.post(
    "/",
    appointmentController.bookAppointment.bind(
        appointmentController
    )
);

router.delete(
    "/:id",
    appointmentController.cancelAppointment.bind(
        appointmentController
    )
);

export default router;