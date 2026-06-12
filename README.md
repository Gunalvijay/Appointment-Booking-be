Appointment Booking System Backend

A backend application for managing doctor appointments built using Domain-Driven Design (DDD), Clean Architecture, and Hexagonal Architecture (Ports & Adapters).

This project follows:

  Domain Driven Design (DDD)
  Clean Architecture
  Hexagonal Architecture
  Dependency Inversion Principle
  SOLID Principles

  ┌─────────────────────┐
  │   Infrastructure    │
  │ Controllers, Routes │
  │ PostgreSQL Adapter  │
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │    Application      │
  │ Use Cases           │
  │ Commands            │
  │ Ports               │
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │      Domain         │
  │ Entities            │
  │ Value Objects       │
  │ Domain Services     │
  │ Domain Exceptions   │
  └─────────────────────┘

  -----------------------------------------------------------

Current Features
  Book Appointment

  Allows a patient to book an appointment with a doctor.

  Business Rules:

  Doctor cannot have two appointments in the same slot.
  Appointment starts with status BOOKED.
  Cancel Appointment
  
  Allows cancellation of an existing appointment.
  
  Business Rules:
  
  Appointment must exist.
  Appointment cannot be cancelled twice.

----------------------------------------------------------------

  Project Structure

  src
  │
  ├── domain
  │   └── appointment
  │       ├── entities
  │       ├── value-objects
  │       ├── services
  │       ├── enums
  │       └── exceptions
  │
  ├── application
  │   └── appointment
  │       ├── ports
  │       │   ├── inbound
  │       │   └── outbound
  │       │
  │       └── use-cases
  │           ├── book-appointment
  │           └── cancel-appointment
  │
  ├── infrastructure
  │   ├── config
  │   ├── persistence
  │   │   ├── memory
  │   │   └── postgres
  │   │
  │   └── web
  │       ├── controllers
  │       ├── routes
  │       ├── dto
  │       └── middleware
  │
  ├── tests
  │
  ├── app.ts
  └── server.ts

  -----------------------------------------------------------

Technologies Used

  Node.js
  TypeScript
  Express.js
  PostgreSQL
  pg Driver

  ------------------------------------------------------------

Database Setup

Create Database

CREATE DATABASE appointment_db;

Create Table

CREATE TABLE appointments (
    id VARCHAR(100) PRIMARY KEY,
    patient_id VARCHAR(100) NOT NULL,
    doctor_id VARCHAR(100) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL
);

Installation

Clone repository

git clone <repository-url>

Install dependencies

npm install
Running the Application

Development

npm run dev

Expected output

Server is running on port 3000