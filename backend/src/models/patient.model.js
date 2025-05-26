const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  medicalHistory: {
    allergies: [String],
    chronicConditions: [String],
    pastSurgeries: [{
      name: String,
      date: Date,
      notes: String
    }],
    familyHistory: [String]
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phoneNumber: String
  },
  insurance: {
    provider: String,
    policyNumber: String,
    expiryDate: Date
  },
  bloodType: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', '']
  },
  height: Number, // in cm
  weight: Number, // in kg
  medications: [{
    name: String,
    dosage: String,
    frequency: String,
    startDate: Date,
    endDate: Date,
    notes: String,
    prescribedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor'
    }
  }]
}, {
  timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
