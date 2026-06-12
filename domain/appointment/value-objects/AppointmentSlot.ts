export class AppointmentSlot {
    constructor(
        private readonly startTime: Date,
        private readonly endTime: Date
    ) {
        if (startTime >= endTime) {
            throw new Error("Invalid slot");
        }
    }

    overlaps(other: AppointmentSlot): boolean {
        return (
            this.startTime < other.endTime && this.endTime > other.startTime
        );
    }

    getStartTime() {
        return this.startTime;
    }

    getEndTime() {
        return this.endTime;
    }
}