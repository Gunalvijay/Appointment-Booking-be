import { AppointmentRepositoryPort } from "../../../application/appointment/ports/outbound/AppointmentRepositoryPort";
import { Appointment } from "../../../domain/appointment/entities/Appointment";
import { AppointmentSlot } from "../../../domain/appointment/value-objects/AppointmentSlot";
import pool from "../../config/database";

export class AppointmentRepositoryAdaptor implements AppointmentRepositoryPort {

    async save(
        appointment: Appointment
    ): Promise<void> {

        await pool.query(
            `
            INSERT INTO appointments (
                id,
                patient_id,
                doctor_id,
                start_time,
                end_time,
                status
            )
            VALUES ($1,$2,$3,$4,$5,$6)
            `,
            [
                appointment.getId(),
                appointment.getPatientId(),
                appointment.getDoctorId(),
                appointment.getSlot().getStartTime(),
                appointment.getSlot().getEndTime(),
                appointment.getStatus()
            ]
        );
    }

    async update(
        appointment: Appointment
    ): Promise<void> {

        await pool.query(
            `
            UPDATE appointments
            SET status = $1
            WHERE id = $2
            `,
            [
                appointment.getStatus(),
                appointment.getId()
            ]
        );
    }

    async findById(
        id: string
    ): Promise<Appointment | null> {

        const result =
            await pool.query(
                `
                SELECT *
                FROM appointments
                WHERE id = $1
                `,
                [id]
            );

        if (result.rows.length === 0) {
            return null;
        }

        const row = result.rows[0];

        const slot =
            new AppointmentSlot(
                row.start_time,
                row.end_time
            );

        return new Appointment(
            row.id,
            row.patient_id,
            row.doctor_id,
            slot
        );
    }

    async findByDoctorAndSlot(
        doctorId: string,
        slot: AppointmentSlot
    ): Promise<Appointment | null> {

        const result =
            await pool.query(
                `
                SELECT *
                FROM appointments
                WHERE doctor_id = $1
                AND start_time = $2
                AND end_time = $3
                AND status = 'BOOKED'
                `,
                [
                    doctorId,
                    slot.getStartTime(),
                    slot.getEndTime()
                ]
            );

        if (result.rows.length === 0) {
            return null;
        }

        const row = result.rows[0];

        const appointmentSlot =
            new AppointmentSlot(
                row.start_time,
                row.end_time
            );

        return new Appointment(
            row.id,
            row.patient_id,
            row.doctor_id,
            appointmentSlot,
            row.status
        );
    }
}