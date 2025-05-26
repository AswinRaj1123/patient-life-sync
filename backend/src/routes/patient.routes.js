const express = require('express');
const router = express.Router();
const { 
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient
} = require('../controllers/patient.controller');
const { protect, authorize } = require('../middleware/auth');

// Routes
router.route('/')
  .get(protect, authorize('admin', 'doctor'), getAllPatients)
  .post(protect, createPatient);

router.route('/:id')
  .get(protect, getPatientById)
  .put(protect, updatePatient);

module.exports = router;
