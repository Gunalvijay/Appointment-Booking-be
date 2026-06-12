import { AppointmentSlot } from "../../../../domain/appointment/value-objects/AppointmentSlot";

export interface BookAppointmentCommand {
    appointmentId: string;
    patientId: string;
    doctorId: string;
    slot: AppointmentSlot;
}