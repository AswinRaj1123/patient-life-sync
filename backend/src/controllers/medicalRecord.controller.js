const MedicalRecord = require('../models/medicalRecord.model');
const Patient = require('../models/patient.model');
const Doctor = require('../models/doctor.model');

// @desc    Get all medical records
// @route   GET /api/medical-records
// @access  Private
exports.getAllMedicalRecords = async (req, res) => {
  try {
    let query = {};
    
    // If user is a patient, only show their records
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ user: req.user.id });
      if (!patient) {
        return res.status(404).json({
          success: false,
          message: 'Patient profile not found'
        });
      }
      query.patient = patient._id;
    }
    
    // If user is a doctor, only show records of their patients
    if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ user: req.user.id });
      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: 'Doctor profile not found'
        });
      }
      query.doctor = doctor._id;
    }
    
    const medicalRecords = await MedicalRecord.find(query)
      .populate({
        path: 'patient',
        populate: {
          path: 'user',
          select: 'name email'
        }
      })
      .populate({
        path: 'doctor',
        populate: {
          path: 'user',
          select: 'name email'
        }
      })
      .sort({ visitDate: -1 });
    
    res.json({
      success: true,
      count: medicalRecords.length,
      data: medicalRecords
    });
  } catch (error) {
    console.error('Error in getAllMedicalRecords:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get medical record by ID
// @route   GET /api/medical-records/:id
// @access  Private
exports.getMedicalRecordById = async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.findById(req.params.id)
      .populate({
        path: 'patient',
        populate: {
          path: 'user',
          select: 'name email'
        }
      })
      .populate({
        path: 'doctor',
        populate: {
          path: 'user',
          select: 'name email'
        }
      })
      .populate('appointmentId');
    
    if (!medicalRecord) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found'
      });
    }
    
    // Check if user has permission to view
    if (
      req.user.role !== 'admin' &&
      medicalRecord.patient.user._id.toString() !== req.user.id &&
      medicalRecord.doctor.user._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this medical record'
      });
    }
    
    res.json({
      success: true,
      data: medicalRecord
    });
  } catch (error) {
    console.error('Error in getMedicalRecordById:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create new medical record
// @route   POST /api/medical-records
// @access  Private/Doctor
exports.createMedicalRecord = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      appointmentId,
      visitDate,
      diagnosis,
      symptoms,
      treatment,
      labResults,
      imaging,
      vitals,
      notes,
      followUpNeeded,
      followUpDate
    } = req.body;
    
    // Verify patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }
    
    // Verify doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }
    
    // Only doctors or admins can create medical records
    if (req.user.role !== 'doctor' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only doctors can create medical records'
      });
    }
    
    // If the user is a doctor, make sure they're creating a record for their own patient
    if (req.user.role === 'doctor') {
      const userDoctor = await Doctor.findOne({ user: req.user.id });
      if (!userDoctor || userDoctor._id.toString() !== doctorId) {
        return res.status(403).json({
          success: false,
          message: 'You can only create medical records for your own patients'
        });
      }
    }
    
    // Create medical record
    const medicalRecord = await MedicalRecord.create({
      patient: patientId,
      doctor: doctorId,
      appointmentId: appointmentId || null,
      visitDate,
      diagnosis: diagnosis || [],
      symptoms: symptoms || [],
      treatment: treatment || {},
      labResults: labResults || [],
      imaging: imaging || [],
      vitals: vitals || {},
      notes: notes || '',
      followUpNeeded: followUpNeeded || false,
      followUpDate,
      createdBy: req.user.id
    });
    
    res.status(201).json({
      success: true,
      message: 'Medical record created successfully',
      data: medicalRecord
    });
  } catch (error) {
    console.error('Error in createMedicalRecord:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update medical record
// @route   PUT /api/medical-records/:id
// @access  Private/Doctor
exports.updateMedicalRecord = async (req, res) => {
  try {
    const {
      diagnosis,
      symptoms,
      treatment,
      labResults,
      imaging,
      vitals,
      notes,
      followUpNeeded,
      followUpDate,
      isActive
    } = req.body;
    
    const medicalRecord = await MedicalRecord.findById(req.params.id);
    
    if (!medicalRecord) {
      return res.status(404).json({
        success: false,
        message: 'Medical record not found'
      });
    }
    
    // Only the doctor who created the record or an admin can update it
    const doctor = await Doctor.findById(medicalRecord.doctor);
    
    if (
      req.user.role !== 'admin' && 
      doctor.user.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this medical record'
      });
    }
    
    // Update fields
    if (diagnosis) medicalRecord.diagnosis = diagnosis;
    if (symptoms) medicalRecord.symptoms = symptoms;
    if (treatment) medicalRecord.treatment = treatment;
    if (labResults) medicalRecord.labResults = labResults;
    if (imaging) medicalRecord.imaging = imaging;
    if (vitals) medicalRecord.vitals = vitals;
    if (notes) medicalRecord.notes = notes;
    if (followUpNeeded !== undefined) medicalRecord.followUpNeeded = followUpNeeded;
    if (followUpDate) medicalRecord.followUpDate = followUpDate;
    if (isActive !== undefined) medicalRecord.isActive = isActive;
    
    medicalRecord.updatedBy = req.user.id;
    
    const updatedMedicalRecord = await medicalRecord.save();
    
    res.json({
      success: true,
      message: 'Medical record updated successfully',
      data: updatedMedicalRecord
    });
  } catch (error) {
    console.error('Error in updateMedicalRecord:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
