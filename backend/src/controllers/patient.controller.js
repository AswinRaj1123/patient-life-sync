const Patient = require('../models/patient.model');
const User = require('../models/user.model');

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private/Admin
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find()
      .populate('user', 'name email phoneNumber')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: patients.length,
      data: patients
    });
  } catch (error) {
    console.error('Error in getAllPatients:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get patient by ID
// @route   GET /api/patients/:id
// @access  Private
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate('user', 'name email phoneNumber dateOfBirth gender profilePicture');

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    res.json({
      success: true,
      data: patient
    });
  } catch (error) {
    console.error('Error in getPatientById:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create patient profile
// @route   POST /api/patients
// @access  Private
exports.createPatient = async (req, res) => {
  try {
    const {
      medicalHistory,
      emergencyContact,
      insurance,
      bloodType,
      height,
      weight
    } = req.body;

    // Check if patient already exists
    const existingPatient = await Patient.findOne({ user: req.user.id });

    if (existingPatient) {
      return res.status(400).json({
        success: false,
        message: 'Patient profile already exists for this user'
      });
    }

    // Create patient profile
    const patient = await Patient.create({
      user: req.user.id,
      medicalHistory: medicalHistory || {},
      emergencyContact: emergencyContact || {},
      insurance: insurance || {},
      bloodType: bloodType || '',
      height,
      weight
    });

    // Update user role if not already patient
    const user = await User.findById(req.user.id);
    if (user.role !== 'patient') {
      user.role = 'patient';
      await user.save();
    }

    res.status(201).json({
      success: true,
      message: 'Patient profile created successfully',
      data: patient
    });
  } catch (error) {
    console.error('Error in createPatient:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update patient profile
// @route   PUT /api/patients/:id
// @access  Private
exports.updatePatient = async (req, res) => {
  try {
    const {
      medicalHistory,
      emergencyContact,
      insurance,
      bloodType,
      height,
      weight,
      medications
    } = req.body;

    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    // Check if the logged-in user is the patient or an admin
    if (patient.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this patient'
      });
    }

    // Update fields
    if (medicalHistory) patient.medicalHistory = medicalHistory;
    if (emergencyContact) patient.emergencyContact = emergencyContact;
    if (insurance) patient.insurance = insurance;
    if (bloodType) patient.bloodType = bloodType;
    if (height) patient.height = height;
    if (weight) patient.weight = weight;
    if (medications) patient.medications = medications;

    const updatedPatient = await patient.save();

    res.json({
      success: true,
      message: 'Patient profile updated successfully',
      data: updatedPatient
    });
  } catch (error) {
    console.error('Error in updatePatient:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
