const express = require('express');
const router = express.Router();
const { 
  getAllMedicalRecords,
  getMedicalRecordById,
  createMedicalRecord,
  updateMedicalRecord
} = require('../controllers/medicalRecord.controller');
const { protect, authorize } = require('../middleware/auth');

// Routes
router.route('/')
  .get(protect, getAllMedicalRecords)
  .post(protect, authorize('doctor', 'admin'), createMedicalRecord);

router.route('/:id')
  .get(protect, getMedicalRecordById)
  .put(protect, authorize('doctor', 'admin'), updateMedicalRecord);

module.exports = router;
