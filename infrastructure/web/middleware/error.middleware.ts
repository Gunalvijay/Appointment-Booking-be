import { Request, Response, NextFunction } from 'express';
import { AppointmentAlreadyBookedError } from '../../../domain/appointment/exeptions/AppointmentAlreadyBookedError';
import { AppointmentNotFoundError } from '../../../domain/appointment/exeptions/AppointmentNotFoundError';

export function errorMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if(err instanceof AppointmentNotFoundError) {
        res.status(404).json({
            success: false,
            message: err.message
        });
        return;
    }

    if(err instanceof AppointmentAlreadyBookedError) {
        res.status(409).json({
            success: false,
            message: err.message
        });
        return;
    }

    res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    });
}