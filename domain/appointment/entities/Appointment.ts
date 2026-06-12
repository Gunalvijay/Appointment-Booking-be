import { AppointmentStatus } from "../enums/AppointmentStatus";
import { AppointmentAlreadyCancelledError } from "../exeptions/AppointmentAlreadyCancelledError";
import { AppointmentSlot } from "../value-objects/AppointmentSlot";

export class Appointment {

    constructor(
        private readonly id: string,
        private readonly patientId: string,
        private readonly doctorId: string,
        private readonly slot: AppointmentSlot,
        private status: AppointmentStatus = AppointmentStatus.BOOKED
    ) {}

    cancel(): void {

        if (this.status === AppointmentStatus.CANCELLED) {
            throw new AppointmentAlreadyCancelledError();
        }

        this.status = AppointmentStatus.CANCELLED;
    }

    isCancelled(): boolean {
        return this.status === AppointmentStatus.CANCELLED;
    }

    getId(): string {
        return this.id;
    }

    getPatientId(): string {
        return this.patientId;
    }

    getDoctorId(): string {
        return this.doctorId;
    }

    getSlot(): AppointmentSlot {
        return this.slot;
    }

    getStatus(): AppointmentStatus {
        return this.status;
    }
}