import { AppointmentRepositoryPort } from "../../../application/appointment/ports/outbound/AppointmentRepositoryPort";
import { Appointment } from "../../../domain/appointment/entities/Appointment";
import { AppointmentSlot } from "../../../domain/appointment/value-objects/AppointmentSlot";

export class InMemoryAppointmentRepository
    implements AppointmentRepositoryPort {

    private appointments: Appointment[] = [];

    async save(
        appointment: Appointment
    ): Promise<void> {

        this.appointments.push(
            appointment
        );
    }

    async update(
        appointment: Appointment
    ): Promise<void> {
        const index = this.appointments.findIndex(
            a => a.getId() === appointment.getId()
        );
        if (index !== -1) {
            this.appointments[index] = appointment;
        }
    }

    async findById(
        id: string
    ): Promise<Appointment | null> {

        return (
            this.appointments.find(
                a => a.getId() === id
            ) || null
        );
    }

    async findByDoctorAndSlot(
        doctorId: string,
        slot: AppointmentSlot
    ): Promise<Appointment | null> {

        return (
            this.appointments.find(
                a =>
                    a.getDoctorId() === doctorId
            ) || null
        );
    }
}