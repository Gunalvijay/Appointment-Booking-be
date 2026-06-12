import { BookAppointmentCommand } from "../../use-cases/book-appointment/BookAppointmentCommand";
import { BookAppointmentResponse } from "../../use-cases/book-appointment/BookAppointmentResponse";

export interface BookAppointmentPort {
    execute(
        command: BookAppointmentCommand
    ): Promise<BookAppointmentResponse>;
}