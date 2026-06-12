import { BookAppointmentUseCase } from "../../application/appointment/use-cases/book-appointment/BookAppointmentUseCase";
import { CancelAppointmentUseCase } from "../../application/appointment/use-cases/cancel-appointment/CancelAppointmentUseCase";
import { AppointmentSchedulingService } from "../../domain/appointment/services/AppointmentSchedulingService";
import { InMemoryAppointmentRepository } from "../persistence/memory/InMemoryAppointmentRepository";
import { AppointmentRepositoryAdaptor } from "../persistence/postgres/AppointmentRepositoryAdaptor";
import { AppointmentController } from "../web/controllers/AppointmentController";

const respository = new AppointmentRepositoryAdaptor();

const schedulingService = new AppointmentSchedulingService(respository);

const bookAppointmentUseCase = new BookAppointmentUseCase(respository, schedulingService);

const cancelAppointmentUseCase = new CancelAppointmentUseCase(respository);

export const appointmentController = new AppointmentController(
    bookAppointmentUseCase,
    cancelAppointmentUseCase
);