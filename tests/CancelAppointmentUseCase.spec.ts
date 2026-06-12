import { describe, it, expect } from "vitest";

import { AppointmentSchedulingService } from "../domain/appointment/services/AppointmentSchedulingService";
import { AppointmentSlot } from "../domain/appointment/value-objects/AppointmentSlot";
import { InMemoryAppointmentRepository } from "../infrastructure/persistence/memory/InMemoryAppointmentRepository";
import { CancelAppointmentUseCase } from "../application/appointment/use-cases/cancel-appointment/CancelAppointmentUseCase";
import { BookAppointmentUseCase } from "../application/appointment/use-cases/book-appointment/BookAppointmentUseCase";
import { AppointmentRepositoryAdaptor } from "../infrastructure/persistence/postgres/AppointmentRepositoryAdaptor";


describe("CancelAppointmentUseCase", () => {

    it("should cancel an appointment", async () => {

        const repository =
            new AppointmentRepositoryAdaptor();

        const schedulingService =
            new AppointmentSchedulingService(
                repository
            );

        const bookUseCase =
            new BookAppointmentUseCase(
                repository,
                schedulingService
            );

        const cancelUseCase =
            new CancelAppointmentUseCase(
                repository
            );

        const slot =
            new AppointmentSlot(
                new Date("2026-06-10T10:00:00"),
                new Date("2026-06-10T10:30:00")
            );

        await bookUseCase.execute({
            appointmentId: "APT-1",
            patientId: "PAT-1",
            doctorId: "DOC-1",
            slot
        });

        const result =
            await cancelUseCase.execute({
                appointmentId: "APT-1"
            });

        expect(result.success).toBe(true);
    });
});