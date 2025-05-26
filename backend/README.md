# HealthSync Backend API

This is the backend API for the HealthSync healthcare management application. It provides endpoints for user authentication, patient and doctor profile management, appointment scheduling, and medical record management.

## Tech Stack

- Node.js
- Express.js
- MongoDB (configured but not connected as per current requirements)
- JWT Authentication

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/healthsync
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

3. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication

- **Register User**: `POST /api/auth/register`
- **Login User**: `POST /api/auth/login`
- **Get User Profile**: `GET /api/auth/me`
- **Update User Profile**: `PUT /api/auth/me`

### Patients

- **Get All Patients**: `GET /api/patients`
- **Get Patient by ID**: `GET /api/patients/:id`
- **Create Patient Profile**: `POST /api/patients`
- **Update Patient Profile**: `PUT /api/patients/:id`

### Doctors

- **Get All Doctors**: `GET /api/doctors`
- **Get Doctor by ID**: `GET /api/doctors/:id`
- **Create Doctor Profile**: `POST /api/doctors`
- **Update Doctor Profile**: `PUT /api/doctors/:id`

### Appointments

- **Get All Appointments**: `GET /api/appointments`
- **Get Appointment by ID**: `GET /api/appointments/:id`
- **Create Appointment**: `POST /api/appointments`
- **Update Appointment**: `PUT /api/appointments/:id`
- **Delete Appointment**: `DELETE /api/appointments/:id`

### Medical Records

- **Get All Medical Records**: `GET /api/medical-records`
- **Get Medical Record by ID**: `GET /api/medical-records/:id`
- **Create Medical Record**: `POST /api/medical-records`
- **Update Medical Record**: `PUT /api/medical-records/:id`

## Authentication

All protected routes require a Bearer token which can be obtained by logging in or registering.

Example header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Data Models

### User

- name: String (required)
- email: String (required, unique)
- password: String (required)
- role: String (enum: 'patient', 'doctor', 'admin', default: 'patient')
- phoneNumber: String
- profilePicture: String
- dateOfBirth: Date
- gender: String (enum: 'male', 'female', 'other', '')

### Patient

- user: Reference to User
- medicalHistory: Object (allergies, chronicConditions, pastSurgeries, familyHistory)
- emergencyContact: Object (name, relationship, phoneNumber)
- insurance: Object (provider, policyNumber, expiryDate)
- bloodType: String
- height: Number
- weight: Number
- medications: Array

### Doctor

- user: Reference to User
- specialization: String (required)
- qualification: Array of Strings
- experience: Number
- licenseNumber: String (required)
- clinicAddress: Object (street, city, state, zipCode, country)
- workingHours: Array
- ratings: Object (average, count)
- fees: Number
- bio: String
- acceptingNewPatients: Boolean (default: true)

### Appointment

- patient: Reference to Patient
- doctor: Reference to Doctor
- date: Date (required)
- startTime: String (required)
- endTime: String (required)
- status: String (enum: 'scheduled', 'confirmed', 'completed', 'cancelled', 'no-show')
- reason: String (required)
- notes: String
- followUp: Object (required, date)

### Medical Record

- patient: Reference to Patient
- doctor: Reference to Doctor
- appointmentId: Reference to Appointment
- visitDate: Date (required)
- diagnosis: Array of Strings
- symptoms: Array of Strings
- treatment: Object (medications, procedures, recommendations)
- labResults: Array
- imaging: Array
- vitals: Object
- notes: String
- followUpNeeded: Boolean
- followUpDate: Date
- isActive: Boolean (default: true)

## Notes

The MongoDB connection is configured but not activated as per the current requirements. To enable the database connection, uncomment the `connectDB()` call in the `server.js` file.
