import { CancelAppointmentCommand } from "../../use-cases/cancel-appointment/CancelAppointmentCommand";
import { CancelAppointmentResponse } from "../../use-cases/cancel-appointment/CancelAppointmentResponse";

export interface CancelAppointmentPort {
    execute(
        command: CancelAppointmentCommand
    ): Promise<CancelAppointmentResponse>;
}