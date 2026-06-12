import { CancelAppointmentCommand } from "./CancelAppointmentCommand";
import { CancelAppointmentResponse } from "./CancelAppointmentResponse";
import { AppointmentNotFoundError } from "../../../../domain/appointment/exeptions/AppointmentNotFoundError";
import { AppointmentRepositoryPort } from "../../ports/outbound/AppointmentRepositoryPort";

export class CancelAppointmentUseCase {
    constructor (
        private readonly appointmentRepository: AppointmentRepositoryPort,
    ) {}

    async execute(
        command: CancelAppointmentCommand
    ): Promise<CancelAppointmentResponse> {

        const appointment = await this.appointmentRepository.findById(
            command.appointmentId
        );

        if(!appointment){
            console.log(`Appointment with id ${command.appointmentId} not found`);
            throw new AppointmentNotFoundError;
        }

        appointment.cancel();

        await this.appointmentRepository.update(
            appointment
        );

        return {
            appointmentId: appointment.getId(),
            success: true,
            message: "Appointment cancelled successfully"
        };
    }
}