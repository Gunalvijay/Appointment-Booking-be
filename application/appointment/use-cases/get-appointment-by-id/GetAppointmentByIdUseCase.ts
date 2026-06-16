import { AppointmentRepositoryPort } from "../../ports/outbound/AppointmentRepositoryPort";
import { GetAppointmentByIdPort } from "../../ports/inbound/GetAppointmentByIdPort";
import { GetAppointmentByIdCommand } from "./GetAppointmentByIdCommand";
import { GetAppointmentByIdResponse } from "./GetAppointmentByIdResponse";
import { AppointmentNotFoundError } from "../../../../domain/appointment/exeptions/AppointmentNotFoundError";

export class GetAppointmentByIdUseCase
    implements GetAppointmentByIdPort {

    constructor(
        private readonly appointmentRepository:
            AppointmentRepositoryPort
    ) {}

    async execute(
        command: GetAppointmentByIdCommand
    ): Promise<GetAppointmentByIdResponse> {

        const appointment =
            await this.appointmentRepository.findById(
                command.appointmentId
            );

        if (!appointment) {
            throw new AppointmentNotFoundError();
        }

        return {
            appointmentId: appointment.getId(),
            patientId: appointment.getPatientId(),
            doctorId: appointment.getDoctorId(),
            startTime: appointment.getSlot().getStartTime(),
            endTime: appointment.getSlot().getEndTime(),
            status: appointment.getStatus()
        };
    }
}