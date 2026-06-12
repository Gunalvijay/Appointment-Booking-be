import { AppointmentSlot } from "../value-objects/AppointmentSlot";
import { AppointmentAlreadyBookedError } from "../exeptions/AppointmentAlreadyBookedError";
import { AppointmentRepositoryPort } from "../../../application/appointment/ports/outbound/AppointmentRepositoryPort";

export class AppointmentSchedulingService {
    constructor(
        private readonly appointmentRepository: AppointmentRepositoryPort
    ){}

    async ensureSlotIsAvailable(
        doctorId: string,
        slot: AppointmentSlot
    ): Promise<void> {
        const existingAppointment = await this.appointmentRepository.findByDoctorAndSlot(
            doctorId,
            slot
        );

        if(existingAppointment){
            throw new AppointmentAlreadyBookedError();
        }
    }
}