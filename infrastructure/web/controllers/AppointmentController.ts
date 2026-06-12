import { NextFunction, Request, Response } from "express";
import { AppointmentSlot } from "../../../domain/appointment/value-objects/AppointmentSlot";
import { BookAppointmentPort } from "../../../application/appointment/ports/inbound/BookAppointmentPort";
import { CancelAppointmentPort } from "../../../application/appointment/ports/inbound/CancelAppointmentPots";
import { BookAppointmentRequest } from "../dto/BookAppointmentRequest";
import { CancelAppointmentParams } from "../dto/CancelAppointmentParams";

export class AppointmentController {

    constructor(
        private readonly bookAppointmentUseCase: BookAppointmentPort,
        private readonly cancelAppointmentUseCase: CancelAppointmentPort
    ) {}

    async bookAppointment(
        req: Request<{}, {}, BookAppointmentRequest>,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        try{
            const slot = new AppointmentSlot(
                new Date(req.body.slot.startTime),
                new Date(req.body.slot.endTime)
            );

            const result =
                await this.bookAppointmentUseCase.execute({
                    appointmentId: req.body.appointmentId,
                    patientId: req.body.patientId,
                    doctorId: req.body.doctorId,
                    slot
                });

            res.status(201).json(result);
        }
        catch (error) {
            next(error);
        }
    }

    async cancelAppointment(
        req: Request<CancelAppointmentParams>,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        try {

            const result =
                await this.cancelAppointmentUseCase.execute({
                    appointmentId: req.params.id
                });

            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}