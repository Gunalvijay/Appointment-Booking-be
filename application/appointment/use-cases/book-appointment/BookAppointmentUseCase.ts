import { Appointment } from "../../../../domain/appointment/entities/Appointment";
import { AppointmentSchedulingService } from "../../../../domain/appointment/services/AppointmentSchedulingService";
import { BookAppointmentPort } from "../../ports/inbound/BookAppointmentPort";
import { AppointmentRepositoryPort } from "../../ports/outbound/AppointmentRepositoryPort";
import { BookAppointmentCommand } from "./BookAppointmentCommand";
import { BookAppointmentResponse } from "./BookAppointmentResponse";

export class BookAppointmentUseCase implements BookAppointmentPort {

    constructor(
        private readonly appointmentRepository: AppointmentRepositoryPort,
        private readonly appointmentSchedulingService: AppointmentSchedulingService
    ) {}

    async execute(
        command: BookAppointmentCommand
    ): Promise<BookAppointmentResponse> {

        await this.appointmentSchedulingService.ensureSlotIsAvailable(
            command.doctorId,
            command.slot
        );

        const appointment = new Appointment(
            command.appointmentId,
            command.patientId,
            command.doctorId,
            command.slot
        );

        await this.appointmentRepository.save(
            appointment
        );

        return {
            appointmentId: appointment.getId(),
            success: true,
            message: "Appointment booked successfully"
        }
    }
}