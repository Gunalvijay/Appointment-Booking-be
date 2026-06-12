import { AppointmentSlotRequest } from "./AppointmentSlotRequest";

export interface BookAppointmentRequest {
    appointmentId: string;
    doctorId: string;
    patientId: string;
    slot: AppointmentSlotRequest;
}