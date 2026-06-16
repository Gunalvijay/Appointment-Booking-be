import { GetAppointmentByIdCommand } from "../../use-cases/get-appointment-by-id/GetAppointmentByIdCommand";
import { GetAppointmentByIdResponse } from "../../use-cases/get-appointment-by-id/GetAppointmentByIdResponse";

export interface GetAppointmentByIdPort {
    execute(
        command: GetAppointmentByIdCommand
    ): Promise<GetAppointmentByIdResponse>;
}