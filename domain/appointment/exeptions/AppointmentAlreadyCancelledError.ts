export class AppointmentAlreadyCancelledError extends Error {
    constructor() {
        super("Appointment already cancelled");
        this.name = "AppointmentAlreadyCancelledError";
    }
}