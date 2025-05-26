const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  visitDate: {
    type: Date,
    required: true
  },
  diagnosis: [String],
  symptoms: [String],
  treatment: {
    medications: [{
      name: String,
      dosage: String,
      frequency: String,
      duration: String,
      notes: String
    }],
    procedures: [{
      name: String,
      date: Date,
      notes: String
    }],
    recommendations: [String]
  },
  labResults: [{
    name: String,
    date: Date,
    result: String,
    referenceRange: String,
    units: String,
    notes: String,
    attachments: [String] // file paths or URLs
  }],
  imaging: [{
    type: String, // X-ray, MRI, CT scan, etc.
    date: Date,
    area: String, // Body part
    findings: String,
    attachments: [String] // file paths or URLs
  }],
  vitals: {
    bloodPressure: String,
    heartRate: Number,
    respiratoryRate: Number,
    temperature: Number,
    oxygenSaturation: Number,
    weight: Number,
    height: Number,
    bmi: Number
  },
  notes: String,
  followUpNeeded: {
    type: Boolean,
    default: false
  },
  followUpDate: Date,
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);

module.exports = MedicalRecord;
