const Appointment = require('../models/appointment.model');
const Doctor = require('../models/doctor.model');
const Patient = require('../models/patient.model');

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
exports.getAllAppointments = async (req, res) => {
  try {
    let query = {};
    
    // If the user is a patient, only show their appointments
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
    
    // If the user is a doctor, only show their appointments
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
    
    const appointments = await Appointment.find(query)
      .populate({
        path: 'patient',
        populate: {
          path: 'user',
          select: 'name email profilePicture'
        }
      })
      .populate({
        path: 'doctor',
        populate: {
          path: 'user',
          select: 'name email profilePicture'
        }
      })
      .sort({ date: 1, startTime: 1 });
    
    res.json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    console.error('Error in getAllAppointments:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get appointment by ID
// @route   GET /api/appointments/:id
// @access  Private
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate({
        path: 'patient',
        populate: {
          path: 'user',
          select: 'name email profilePicture'
        }
      })
      .populate({
        path: 'doctor',
        populate: {
          path: 'user',
          select: 'name email profilePicture'
        }
      });
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }
    
    // Check if the user has permission to view this appointment
    if (
      req.user.role !== 'admin' &&
      appointment.patient.user._id.toString() !== req.user.id &&
      appointment.doctor.user._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this appointment'
      });
    }
    
    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('Error in getAppointmentById:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
exports.createAppointment = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      date,
      startTime,
      endTime,
      reason,
      notes
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
    
    // Create appointment
    const appointment = await Appointment.create({
      patient: patientId,
      doctor: doctorId,
      date,
      startTime,
      endTime,
      reason,
      notes: notes || '',
      status: 'scheduled',
      createdBy: req.user.id
    });
    
    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      data: appointment
    });
  } catch (error) {
    console.error('Error in createAppointment:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
exports.updateAppointment = async (req, res) => {
  try {
    const {
      date,
      startTime,
      endTime,
      status,
      reason,
      notes,
      followUp
    } = req.body;
    
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }
    
    // Check if user has permission to update
    const patient = await Patient.findById(appointment.patient);
    const doctor = await Doctor.findById(appointment.doctor);
    
    if (
      req.user.role !== 'admin' && 
      patient.user.toString() !== req.user.id && 
      doctor.user.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this appointment'
      });
    }
    
    // Update fields
    if (date) appointment.date = date;
    if (startTime) appointment.startTime = startTime;
    if (endTime) appointment.endTime = endTime;
    if (status) appointment.status = status;
    if (reason) appointment.reason = reason;
    if (notes) appointment.notes = notes;
    if (followUp) appointment.followUp = followUp;
    
    appointment.updatedBy = req.user.id;
    
    const updatedAppointment = await appointment.save();
    
    res.json({
      success: true,
      message: 'Appointment updated successfully',
      data: updatedAppointment
    });
  } catch (error) {
    console.error('Error in updateAppointment:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }
    
    // Check if user has permission to delete
    const patient = await Patient.findById(appointment.patient);
    const doctor = await Doctor.findById(appointment.doctor);
    
    if (
      req.user.role !== 'admin' && 
      patient.user.toString() !== req.user.id && 
      doctor.user.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this appointment'
      });
    }
    
    await Appointment.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    console.error('Error in deleteAppointment:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
