import { Appointment } from "../../../../domain/appointment/entities/Appointment";
import { AppointmentSlot } from "../../../../domain/appointment/value-objects/AppointmentSlot";

export interface AppointmentRepositoryPort {

    save(
        appointment: Appointment
    ): Promise<void>;

    update(
        appointment: Appointment
    ): Promise<void>;

    findById(
        id: string
    ): Promise<Appointment | null>;

    findByDoctorAndSlot(
        doctorId: string,
        slot: AppointmentSlot
    ): Promise<Appointment | null>;
}