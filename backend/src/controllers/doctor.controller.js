const Doctor = require('../models/doctor.model');
const User = require('../models/user.model');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate('user', 'name email phoneNumber profilePicture')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: doctors.length,
      data: doctors
    });
  } catch (error) {
    console.error('Error in getAllDoctors:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('user', 'name email phoneNumber profilePicture');

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.json({
      success: true,
      data: doctor
    });
  } catch (error) {
    console.error('Error in getDoctorById:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create doctor profile
// @route   POST /api/doctors
// @access  Private
exports.createDoctor = async (req, res) => {
  try {
    const {
      specialization,
      qualification,
      experience,
      licenseNumber,
      clinicAddress,
      workingHours,
      fees,
      bio,
      acceptingNewPatients
    } = req.body;

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ user: req.user.id });

    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: 'Doctor profile already exists for this user'
      });
    }

    // Create doctor profile
    const doctor = await Doctor.create({
      user: req.user.id,
      specialization,
      qualification: qualification || [],
      experience,
      licenseNumber,
      clinicAddress: clinicAddress || {},
      workingHours: workingHours || [],
      fees,
      bio: bio || '',
      acceptingNewPatients: acceptingNewPatients !== undefined ? acceptingNewPatients : true
    });

    // Update user role if not already doctor
    const user = await User.findById(req.user.id);
    if (user.role !== 'doctor') {
      user.role = 'doctor';
      await user.save();
    }

    res.status(201).json({
      success: true,
      message: 'Doctor profile created successfully',
      data: doctor
    });
  } catch (error) {
    console.error('Error in createDoctor:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update doctor profile
// @route   PUT /api/doctors/:id
// @access  Private
exports.updateDoctor = async (req, res) => {
  try {
    const {
      specialization,
      qualification,
      experience,
      licenseNumber,
      clinicAddress,
      workingHours,
      fees,
      bio,
      acceptingNewPatients
    } = req.body;

    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Check if the logged-in user is the doctor or an admin
    if (doctor.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this doctor'
      });
    }

    // Update fields
    if (specialization) doctor.specialization = specialization;
    if (qualification) doctor.qualification = qualification;
    if (experience) doctor.experience = experience;
    if (licenseNumber) doctor.licenseNumber = licenseNumber;
    if (clinicAddress) doctor.clinicAddress = clinicAddress;
    if (workingHours) doctor.workingHours = workingHours;
    if (fees) doctor.fees = fees;
    if (bio) doctor.bio = bio;
    if (acceptingNewPatients !== undefined) doctor.acceptingNewPatients = acceptingNewPatients;

    const updatedDoctor = await doctor.save();

    res.json({
      success: true,
      message: 'Doctor profile updated successfully',
      data: updatedDoctor
    });
  } catch (error) {
    console.error('Error in updateDoctor:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
