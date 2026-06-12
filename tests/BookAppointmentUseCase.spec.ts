import { describe, it, expect } from "vitest";

import { BookAppointmentUseCase } from "../application/appointment/use-cases/book-appointment/BookAppointmentUseCase";
import { AppointmentSchedulingService } from "../domain/appointment/services/AppointmentSchedulingService";
import { AppointmentSlot } from "../domain/appointment/value-objects/AppointmentSlot";
import { InMemoryAppointmentRepository } from "../infrastructure/persistence/memory/InMemoryAppointmentRepository";
import { AppointmentRepositoryAdaptor } from "../infrastructure/persistence/postgres/AppointmentRepositoryAdaptor";

describe("BookAppointmentUseCase", () => {

    it("should book an appointment successfully", async () => {

        const repository =
            new AppointmentRepositoryAdaptor();

        const schedulingService =
            new AppointmentSchedulingService(
                repository
            );

        const useCase =
            new BookAppointmentUseCase(
                repository,
                schedulingService
            );

        const slot =
            new AppointmentSlot(
                new Date("2026-06-10T10:00:00"),
                new Date("2026-06-10T10:30:00")
            );

        const result =
            await useCase.execute({
                appointmentId: "APT-1",
                patientId: "PAT-1",
                doctorId: "DOC-1",
                slot
            });

        expect(result.success).toBe(true);
        expect(result.appointmentId).toBe("APT-1");
    });


    it("should not allow booking the same slot twice", async () => {

        const repository =
            new AppointmentRepositoryAdaptor();

        const schedulingService =
            new AppointmentSchedulingService(
                repository
            );

        const useCase =
            new BookAppointmentUseCase(
                repository,
                schedulingService
            );

        const slot =
            new AppointmentSlot(
                new Date("2026-06-10T10:00:00"),
                new Date("2026-06-10T10:30:00")
            );

        await useCase.execute({
            appointmentId: "APT-1",
            patientId: "PAT-1",
            doctorId: "DOC-1",
            slot
        });

        await expect(
            useCase.execute({
                appointmentId: "APT-2",
                patientId: "PAT-2",
                doctorId: "DOC-1",
                slot
            })
        ).rejects.toThrow();
    });
});