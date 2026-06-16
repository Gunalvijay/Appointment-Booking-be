export interface GetAppointmentByIdResponse {
    appointmentId: string;
    patientId: string;
    doctorId: string;
    startTime: Date;
    endTime: Date;
    status: string;
}