export class AppointmentBooked {
    constructor (
        public readonly appointmentId: string,
        public readonly patientId: string,
        public readonly doctorId: string,
        public readonly slotTime: string
    ) {}
}