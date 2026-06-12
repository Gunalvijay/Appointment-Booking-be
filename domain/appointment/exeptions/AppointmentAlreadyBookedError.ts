export class AppointmentAlreadyBookedError extends Error {
    constructor (){
        super("Appointment slot is already booked");
        this.name = "AppointmentAlreadyBookedError";
    }
}